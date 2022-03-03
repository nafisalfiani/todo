package rest

import (
	"fmt"
	"net/http"
	"strconv"

	"task-history/src/entity"
	"task-history/src/usecase"

	"github.com/gin-gonic/gin"
)

type SuccessResp struct {
	Data interface{} `json:"data,omitempty"`
	Meta Meta        `json:"meta"`
}

type ErrorResp struct {
	Message string
	Meta    Meta `json:"meta"`
}

type Meta struct {
	Message   string `json:"message"`
	Timestamp string `json:"timestamp"`
}

type REST interface {
	Run()
}

type rest struct {
	http *gin.Engine
	uc   usecase.Interface
}

func Init(uc usecase.Interface) REST {
	httpServer := gin.New()

	return &rest{
		http: httpServer,
		uc:   uc,
	}
}

func (r *rest) registerRoutes(httpServer *gin.Engine) {
	httpServer.GET("/hello", r.Hello)
	httpServer.GET("/todo/:task_id/history", r.ReadHistory)
	httpServer.POST("/todo/:task_id/history", r.SaveHistory)
}

func (r *rest) Run() {
	r.registerRoutes(r.http)

	fmt.Println("application is running on port :8090")
	r.http.Run(":8090")
}

func (r *rest) Hello(ctx *gin.Context) {
	httpRespSuccess(ctx, http.StatusOK, "hello!")
}

func (r *rest) ReadHistory(ctx *gin.Context) {
	todoIdStr := ctx.Param("task_id")
	todoID, err := strconv.Atoi(todoIdStr)
	if err != nil {
		httpRespError(ctx, fmt.Sprintf("no todo with ID %v found", todoID), http.StatusNotFound, err)
		return
	}

	todoHistories, err := r.uc.ReadHistory(todoID)
	if err != nil {
		httpRespError(ctx, fmt.Sprintf("cannot find history for todoID %v", todoID), http.StatusInternalServerError, err)
		return
	}

	httpRespSuccess(ctx, http.StatusOK, todoHistories)
}

func (r *rest) SaveHistory(ctx *gin.Context) {
	todoIdStr := ctx.Param("task_id")
	todoID, err := strconv.Atoi(todoIdStr)
	if err != nil {
		httpRespError(ctx, fmt.Sprintf("no todo with ID %v found", todoID), http.StatusNotFound, err)
		return
	}

	todo := entity.Task{
		ID: todoID,
	}

	if err := ctx.BindJSON(&todo); err != nil {
		httpRespError(ctx, "cannot read payload", http.StatusBadRequest, err)
		return
	}

	_, err = r.uc.SaveHistory(todo)
	if err != nil {
		httpRespError(ctx, "cannot save todo history", http.StatusInternalServerError, err)
		return
	}

	httpRespSuccess(ctx, http.StatusCreated, nil)
}
