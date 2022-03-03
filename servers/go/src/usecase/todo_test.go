package usecase

import (
	"log"
	"testing"
	"time"

	"todo-list/src/domain"
	"todo-list/src/entity"
	"github.com/jmoiron/sqlx"
)

func TestNewUC(t *testing.T) {
	type args struct {
		dom domain.Interface
	}
	tests := []struct {
		name string
		args args
	}{
		{
			name: "ok",
			args: args{dom: domain.NewDom()},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := NewUC(tt.args.dom); got != nil {
				t.Errorf("NewUC() = %v, should not be nil", got)
			}
		})
	}
}

func Test_uc_SaveHistory(t *testing.T) {
	type args struct {
		todo entity.Todo
	}
	tests := []struct {
		name    string
		args    args
		wantErr bool
	}{
		{
			name: "ok",
			args: args{todo: entity.Todo{
				ID:          1,
				Title:       "go test this",
				Description: "run the unit tests",
				Status:      "updated",
				CreatedBy:   "program",
				CreatedAt:   time.Now(),
			}},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			u := &uc{
				dom: domain.NewDom(),
			}
			got, err := u.SaveHistory(tt.args.todo)
			if (err != nil) != tt.wantErr {
				t.Errorf("uc.SaveHistory() error = %v, wantErr %v", err, tt.wantErr)
				return
			}

			db, err := sqlx.Connect("mysql", "root:password@tcp(localhost:3306)/todo_db?tls=false&parseTime=true")
			if err != nil {
				log.Fatalln("cannot connect to db", err)
			}

			// clean up tests
			db.MustExec("DELETE FROM todo_history WHERE ID = ?", got)
		})
	}
}

func Test_uc_ReadHistory(t *testing.T) {
	type args struct {
		todoID int
	}
	tests := []struct {
		name    string
		args    args
		wantErr bool
	}{
		{
			name:    "no todo nor histories",
			args:    args{todoID: 0},
			wantErr: true,
		},
		{
			name:    "ok",
			args:    args{todoID: 1},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			u := &uc{
				dom: domain.NewDom(),
			}
			got, err := u.ReadHistory(tt.args.todoID)
			if (err != nil) != tt.wantErr {
				t.Errorf("uc.ReadHistory() error = %v, wantErr %v", err, tt.wantErr)
				return
			}

			if len(got.Histories) < 1 {
				t.Errorf("uc.ReadHistory() = %v, should return todo with at least 1 histories", got)
			}
		})
	}
}
