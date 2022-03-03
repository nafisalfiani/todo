package entity

import "time"

type Task struct {
	ID          int           `json:"id"`
	Title       string        `json:"title"`
	Description string        `json:"description"`
	Priority    int           `json:"priority"`
	Status      bool          `json:"status"`
	DueDate     time.Time     `json:"due_date"`
	CreatedAt   time.Time     `json:"createdAt"`
	UpdatedAt   time.Time     `json:"updatedAt"`
	Histories   []TaskHistory `json:"histories"`
}

type TaskHistory struct {
	ID          int       `json:"id"`
	TaskID      int       `json:"taskId"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Priority    int       `json:"priority"`
	Status      string    `json:"status"`
	DueDate     time.Time `json:"due_date"`
	CreatedAt   time.Time `json:"createdAt"`
	UpdatedAt   time.Time `json:"updatedAt"`
}
