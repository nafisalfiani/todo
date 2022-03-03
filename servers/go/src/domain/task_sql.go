package domain

const (
	saveTaskHistory = `
	INSERT INTO TaskHistories (task_id, title, description, priority, status, due_date, createdAt, updatedAt)
	VALUES (?, ?, ?, ?, ?, ?, ?, ?);
	`

	readTask = `
	SELECT 
		id,
		title,
		description,
		priority,
		status,
		COALESCE(due_date, "0001-01-01") AS due_date,
		COALESCE(createdAt, "0001-01-01") AS createdAt,
		COALESCE(updatedAt, "0001-01-01") AS updatedAt
	FROM Tasks
	WHERE id = ?;
	`

	readTaskHistory = `
	SELECT 
		id,
		task_id,
		title,
		description,
		priority,
		status,
		COALESCE(due_date, "0001-01-01") AS due_date,
		COALESCE(createdAt, "0001-01-01") AS createdAt,
		COALESCE(updatedAt, "0001-01-01") AS updatedAt
	FROM TaskHistories
	WHERE task_id = ?;
	`
)
