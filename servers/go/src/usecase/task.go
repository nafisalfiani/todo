package usecase

import (
	"errors"
	"time"

	"task-history/src/domain"
	"task-history/src/entity"
)

type Interface interface {
	SaveHistory(todo entity.Task) (int, error)
	ReadHistory(todoID int) (entity.Task, error)
}

type uc struct {
	dom domain.Interface
}

func NewUC(dom domain.Interface) Interface {
	return &uc{
		dom: dom,
	}
}

func (u *uc) SaveHistory(todo entity.Task) (int, error) {
	todo.CreatedAt = time.Now()
	todo.UpdatedAt = time.Now()
	return u.dom.SaveHistory(todo)
}

func (u *uc) ReadHistory(todoID int) (entity.Task, error) {
	todo, err := u.dom.ReadHistory(todoID)
	if err != nil {
		return todo, err
	}

	if len(todo.Histories) < 1 {
		return todo, errors.New("no history found")
	}

	return todo, nil
}
