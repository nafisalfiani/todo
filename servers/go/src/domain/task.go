package domain

import (
	"context"
	"database/sql"
	"log"
	"time"

	"task-history/src/entity"

	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
)

type Interface interface {
	SaveHistory(task entity.Task) (int, error)
	ReadHistory(taskID int) (entity.Task, error)
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

func (d *dom) SaveHistory(task entity.Task) (int, error) {
	tx, err := d.db.BeginTx(context.Background(), &sql.TxOptions{})
	if err != nil {
		return 0, err
	}

	res, err := tx.Exec(saveTaskHistory, task.ID, task.Title, task.Description, task.Priority, task.Status, task.DueDate, task.CreatedAt, task.UpdatedAt)
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

func (d *dom) ReadHistory(taskID int) (entity.Task, error) {
	row := d.db.QueryRow(readTask, taskID)

	var task entity.Task
	var dueDate, createdAt, updatedAt string
	if err := row.Scan(
		&task.ID,
		&task.Title,
		&task.Description,
		&task.Priority,
		&task.Status,
		&dueDate,
		&createdAt,
		&updatedAt,
	); err != nil {
		return task, err
	}

	task.DueDate, _ = time.Parse("2006-01-02 15:04:05", dueDate)
	task.CreatedAt, _ = time.Parse("2006-01-02 15:04:05", createdAt)
	task.UpdatedAt, _ = time.Parse("2006-01-02 15:04:05", updatedAt)

	rows, err := d.db.Query(readTaskHistory, taskID)
	if err != nil {
		return task, err
	}

	for rows.Next() {
		history := entity.TaskHistory{}
		var dueDate, createdAt, updatedAt string
		if err := rows.Scan(
			&history.ID,
			&history.TaskID,
			&history.Title,
			&history.Description,
			&history.Priority,
			&history.Status,
			&dueDate,
			&createdAt,
			&updatedAt,
		); err != nil {
			log.Println(err)
			continue
		}

		task.DueDate, _ = time.Parse("2006-01-02 15:04:05", dueDate)
		task.CreatedAt, _ = time.Parse("2006-01-02 15:04:05", createdAt)
		task.UpdatedAt, _ = time.Parse("2006-01-02 15:04:05", updatedAt)

		task.Histories = append(task.Histories, history)
	}

	return task, nil
}
