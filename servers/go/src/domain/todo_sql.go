package domain

const (
	saveTodoHistory = `
	INSERT INTO todo_history (todo_id, title, description, status, created_by, created_at)
	VALUES (?, ?, ?, ?, ?, ?)
	`

	readTodo = `
	SELECT 
		id,
		title,
		description,
		status,
		created_by,
		created_at,
		COALESCE(updated_by, ""),
		COALESCE(updated_at, "0001-01-01"),
		is_deleted,
		COALESCE(deleted_by, ""),
		COALESCE(deleted_at, "0001-01-01")
	FROM todo
	WHERE id = ?
	`

	readTodoHistory = `
	SELECT 
		id,
		todo_id,
		title,
		description,
		status,
		created_by,
		created_at,
		COALESCE(updated_by, ""),
		COALESCE(updated_at, "0001-01-01"),
		is_deleted,
		COALESCE(deleted_by, ""),
		COALESCE(deleted_at, "0001-01-01")
	FROM todo_history
	WHERE todo_id = ?
	`
)
