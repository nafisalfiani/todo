package main

import (
	"todo-list/src/domain"
	"todo-list/src/rest"
	"todo-list/src/usecase"
)

func main() {
	dom := domain.NewDom()

	uc := usecase.NewUC(dom)

	r := rest.Init(uc)

	r.Run()
}
