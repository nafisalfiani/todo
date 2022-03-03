package entity

import "time"

type Todo struct {
	ID          int           `json:"id" db:"id"`
	Title       string        `json:"title" db:"title"`
	Description string        `json:"description" db:"description"`
	Status      string        `json:"status" db:"status"`
	CreatedBy   string        `json:"createdBy" db:"created_by"`
	CreatedAt   time.Time     `json:"createdAt" db:"created_at"`
	UpdatedBy   string        `json:"updatedBy" db:"updated_by"`
	UpdatedAt   time.Time     `json:"updatedAt" db:"updated_at"`
	IsDeleted   string        `json:"isDeleted" db:"is_deleted"`
	DeletedBy   string        `json:"deletedBy" db:"deleted_by"`
	DeletedAt   time.Time     `json:"deletedAt" db:"deleted_at"`
	Histories   []TodoHistory `json:"histories" db:"-"`
}

type TodoHistory struct {
	ID          int       `json:"id" db:"id"`
	TodoID      int       `json:"todoId" db:"todo_id"`
	Title       string    `json:"title" db:"title"`
	Description string    `json:"description" db:"description"`
	Status      string    `json:"status" db:"status"`
	CreatedBy   string    `json:"createdBy" db:"created_by"`
	CreatedAt   time.Time `json:"createdAt" db:"created_at"`
	UpdatedBy   string    `json:"updatedBy" db:"updated_by"`
	UpdatedAt   time.Time `json:"updatedAt" db:"updated_at"`
	DeletedBy   string    `json:"deletedBy" db:"deleted_by"`
	IsDeleted   string    `json:"isDeleted" db:"is_deleted"`
	DeletedAt   time.Time `json:"deletedAt" db:"deleted_at"`
}
