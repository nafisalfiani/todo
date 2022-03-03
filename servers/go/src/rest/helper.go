package rest

import (
	"encoding/json"
	"log"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

func httpRespError(ctx *gin.Context, msg string, status int, err error) {
	log.Println(err)

	errResp := ErrorResp{
		Message: msg,
		Meta: Meta{
			Message:   err.Error(),
			Timestamp: time.Now().Format(time.RFC3339),
		},
	}

	ctx.AbortWithStatusJSON(status, errResp)
}

func httpRespSuccess(ctx *gin.Context, statusCode int, data interface{}) {
	successResp := SuccessResp{
		Data: data,
		Meta: Meta{
			Message:   "Request successful",
			Timestamp: time.Now().Format(time.RFC3339),
		},
	}

	raw, err := json.Marshal(&successResp)
	if err != nil {
		httpRespError(ctx, "failed to marshal", http.StatusInternalServerError, err)
	}

	ctx.Data(statusCode, "application/json", raw)
}
