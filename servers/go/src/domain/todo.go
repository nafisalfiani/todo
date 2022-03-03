package domain

import (
	"context"
	"database/sql"
	"log"
	"time"

	"todo-list/src/entity"
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

type Interface interface {
	SaveHistory(todo entity.Todo) (int, error)
	ReadHistory(todoID int) (entity.Todo, error)
}

type dom struct {
	db *sqlx.DB
}

func NewDom() Interface {
	db, err := sqlx.Open("mysql", "root:password@tcp(localhost:3306)/todo-db?tls=false&parseTime=true")
	if err != nil {
		log.Fatalln("cannot connect to db", err)
	}

	if err := db.Ping(); err != nil {
		log.Fatalln("failed to ping db", err)
	}

	return &dom{
		db: db,
	}
}

func (d *dom) SaveHistory(todo entity.Todo) (int, error) {
	tx, err := d.db.BeginTx(context.Background(), &sql.TxOptions{})
	if err != nil {
		return 0, err
	}

	res, err := tx.Exec(saveTodoHistory, todo.ID, todo.Title, todo.Description, todo.Status, todo.CreatedBy, todo.CreatedAt)
	if err != nil {
		if err := tx.Rollback(); err != nil {
			return 0, err
		}
		return 0, err
	}

	lastID, err := res.LastInsertId()
	if err != nil {
		if err := tx.Rollback(); err != nil {
			return 0, err
		}
		return 0, err
	}

	if err := tx.Commit(); err != nil {
		return int(lastID), err
	}

	return int(lastID), nil
}

func (d *dom) ReadHistory(todoID int) (entity.Todo, error) {
	row := d.db.QueryRow(readTodo, todoID)

	var todo entity.Todo
	var updatedAt string
	var deletedAt string
	if err := row.Scan(
		&todo.ID,
		&todo.Title,
		&todo.Description,
		&todo.Status,
		&todo.CreatedBy,
		&todo.CreatedAt,
		&todo.UpdatedBy,
		&updatedAt,
		&todo.IsDeleted,
		&todo.DeletedBy,
		&deletedAt,
	); err != nil {
		return todo, err
	}

	todo.UpdatedAt, _ = time.Parse("2006-01-02 15:04:05", updatedAt)
	todo.DeletedAt, _ = time.Parse("2006-01-02 15:04:05", deletedAt)

	rows, err := d.db.Query(readTodoHistory, todoID)
	if err != nil {
		return todo, err
	}

	for rows.Next() {
		history := entity.TodoHistory{}
		var updatedAt string
		var deletedAt string
		if err := rows.Scan(
			&history.ID,
			&history.TodoID,
			&history.Title,
			&history.Description,
			&history.Status,
			&history.CreatedBy,
			&history.CreatedAt,
			&history.UpdatedBy,
			&updatedAt,
			&history.IsDeleted,
			&history.DeletedBy,
			&deletedAt,
		); err != nil {
			log.Println(err)
			continue
		}

		history.UpdatedAt, _ = time.Parse("2006-01-02 15:04:05", updatedAt)
		history.DeletedAt, _ = time.Parse("2006-01-02 15:04:05", deletedAt)
		todo.Histories = append(todo.Histories, history)
	}

	return todo, nil
}
