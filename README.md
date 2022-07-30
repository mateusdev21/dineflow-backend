# perpusku-api
### ( This project is still on progress 💪 )
API for my personal project perpusku

## Technologies
* Node JS (Back-end JavaScript runtime environment)
* Express JS (Back-end Framework)
* MongoDB (Database)
* Mongoose (Library to model the application data)
* Crypto (Password hash module)
* Joi (Request validation)
* JWT (Access Auth)
* dotenv (Set environment variables)

## Endpoints

* users

|      Path      |  Method  |    Description    |
| -------------- | -------- | ----------------- |
| /api/users     |  GET     | Get user list     |
| /api/users     |  POST    | Create user       |
| /api/users/:id |  GET     | Get user by id    |
| /api/users/:id |  PUT     | Update user by id |
| /api/users/:id |  DELETE  | Delete user by id |

* books

|      Path      |  Method  |    Description    |
| -------------- | -------- | ----------------- |
| /api/books     |  GET     | Get book list     |
| /api/books     |  POST    | Create book       |
| /api/books/:id |  GET     | Get book by id    |
| /api/books/:id |  PUT     | Update book by id |
| /api/books/:id |  DELETE  | Delete book by id |
