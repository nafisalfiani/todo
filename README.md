# todo
## How-to-run
- Go to dir `./env/`
- Run `docker-compose up`. (Depending on your machine, you may need to change the `platform` inside the `docker-compose.yaml`)
- After the docker is up, go to dir `./servers/node/`
- Run `db:create:development` to prepare the database for the application
- Run `db:migrate:development` to prepare the tables for the application
- Run `db:create:test` to prepare the database for the unit tests
- Run `db:migrate:test` to prepare the tables for the unit tests
- Run `nodemon app.js` to start the node.js application running in port `:3000`
- Go to dir `./servers/go/`
- Run `go run main.go` to start the Go application running in port `:8090`
- Go to dir `./servers/orchestrator`
- Run `nodemon app.js` to start the orchestrator running in port `:3001`
- All the application is now up and running
## List of APIs
### On port `:3000`
#### `POST /user/register`
This endpoint will register a new user with info given in the payload. You can try this for example:
```json
{
    "username": "user-1",
    "email": "user-1@test.com",
    "password": "user123456",
    "firstname": "User",
    "lastname": "One"
}
```
The password will be encrypted using AES-256 and the encrypted password will be stored in the DB.
#### `POST /user/login`
This endpoint will return an `access_token` if given credentials are valid. You can try using the user you just created
```json
{
    "username": "",
    "email": "user-1@test.com",
    "password": "user123456",
}
```
#### `GET /user/list`
This endpoint will return a list of registered user. This endpoint doesn't require a payload
#### `PUT /user/update/:user_id`
This endpoint will update user info based on the given payload. You can try this endpoint using the following payload:
```json
{
    "username": "user-1-updated",
    "email": "user-1-updated@test.com",
    "password": "nolongeruser123456",
    "firstname": "User",
    "lastname": "One-Updated"
}
```
#### `PATCH /user/edit/:user_id`
This endpoint will only update the username of a user. You can try it using this payload:
```json
{
    "username": "user-1-edited"
}
```
#### `POST /task/create`
This endpoint will be used by the orchestrator to create a task. Please refer to port `:3001` for this one
#### `PUT /task/update/:task_id`
This endpoint will be used by the orchestrator to update a task. Please refer to port `:3001` for this one
### On port `:8090`
#### `POST /todo/:task_id/history`
This endpoint will be used by the orchestrator to save a task history. Please refer to port `:3001` for this one
#### `GET /todo/:task_id/history`
This endpoint will be used by the orchestrator to fetch a task histories. Please refer to port `:3001` for this one
### On port `:3001`
#### `GET /listOfUser`
This endpoint will fetch a list of users. No payload is required
#### `GET /todo/:task_id/history`
This endpoint will fetch a task histories. No payload is required
#### `POST /task/create`
This endpoint will make the orchestrator hit application running in `:3000` and tell them to create a task. You can use the following payload
```json
{
    "title": "Create user endpoint",
    "description": "Create user endpoint in Go using POST method",
    "priority": 2, 
    "status": false, 
    "due_date": "2022-03-25T00:00:00:Z"
}
```
#### `PUT /task/update/:id`
This endpoint will make the orchestrator hit application running in `:3001` and tell them to update a task. The orchestrator will also hit application running in `:8090` and tell them to save the task history. You can use the following payload
```json
{
    "title": "Create user endpoint",
    "description": "Create user endpoint in Go using POST method using given info in the request body",
    "priority": 3,
    "status": false,
    "due_date": "2022-03-25T00:00:00:Z"
}
```