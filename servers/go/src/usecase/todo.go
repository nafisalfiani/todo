package usecase

import (
	"errors"

	"todo-list/src/domain"
	"todo-list/src/entity"
)

type Interface interface {
	SaveHistory(todo entity.Todo) (int, error)
	ReadHistory(todoID int) (entity.Todo, error)
}

type uc struct {
	dom domain.Interface
}

func NewUC(dom domain.Interface) Interface {
	return &uc{
		dom: dom,
	}
}

func (u *uc) SaveHistory(todo entity.Todo) (int, error) {
	return u.dom.SaveHistory(todo)
}

func (u *uc) ReadHistory(todoID int) (entity.Todo, error) {
	todo, err := u.dom.ReadHistory(todoID)
	if err != nil {
		return todo, err
	}

	if len(todo.Histories) < 1 {
		return todo, errors.New("no history found")
	}

	return todo, nil
}
