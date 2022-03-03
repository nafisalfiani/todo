package main

import (
	"task-history/src/domain"
	"task-history/src/rest"
	"task-history/src/usecase"
)

func main() {
	dom := domain.NewDom()

	uc := usecase.NewUC(dom)

	r := rest.Init(uc)

	r.Run()
}
