# Car Management API

This is a RESTful API project for registering and managing cars, developed with Node.js, Express, and Sequelize.

## Features
- Register a new car
- Update car items
- Retrieve a car by ID
- Filter cars with pagination
- Edit car data (PATCH)
- Delete a car and its items
- Validation and custom error messages
- Generic error handler for unexpected errors

## Technologies Used

- Node.js
- Express.js
- Sequelize (ORM)
- MySQL (used with Workbench 8.0)

## Production Dependencies

The following libraries were used in this project:

| Library     | Description                               |
|-------------|-------------------------------------------|
| `express`   | Web framework for Node.js                 |
| `cors`      | Enables Cross-Origin Resource Sharing     |
| `dotenv`    | Loads environment variables from `.env`   |
| `sequelize` | ORM for interacting with the database     |
| `mysql2`    | MySQL driver for Node.js + Sequelize      |

## Project Structure
This project follows a layered architecture, separating responsibilities into clear and organized modules:

- controllers/ = Handle HTTP requests and responses.
- services/ = Contain business logic and validation rules.
- models/ = Define database models using Sequelize ORM.
- routes/ = Define API endpoints and route logic.
- repository/ = Handle direct database queries, abstracted from services.
- config/ = Configuration files, including the database connection.
- tests/ = Scripts to validate the database connection and other setup.
- server.js = The entry point of the application.

This approach improves code readability, testability, and scalability.

## Requirements

Before running this project, make sure you have the following installed:

- Node.js (v18 or higher)
- MySQL (Workbench 8.0 or higher)
- npm (Node package manager)

## How to Run the Project

Follow the steps below:

1. Clone the repository

```bash
git clone https://github.com/ligiastalves/ANMAR25_D01_COMPASSCAR.git
cd ANMAR25_D01_COMPASSCAR
```

2. Install dependencies
```bash
npm install
```

3. Create .env file

Create a file named .env in the root directory with the following content:
```
DB_HOST='localhost'
DB_USER='root'
DB_PASSWORD='your password'
DB_NAME='compasscar'
DB_DIALECT='mysql'
DB_PORT='3306'
```

4. Create the database manually using MySQL Workbench or CLI:
```bash
CREATE DATABASE car_database;
```
The tables will be created automatically when the project starts, using Sequelize and the model definitions located in the src/models folder.

5. Start the application
```bash
node server.js
```

The server will run at:
http://localhost:3000/api/v1/cars


6. Test 

You can use Postman, Insomnia, or any HTTP client to test the routes.

| Method | Route | Description |
| -------- | ----- | ----------- |
| POST     | /cars | Create a new car |
| PUT      | /cars/:id/items | Update car items |
| GET    | /cars/:id | Retrieve a car by ID |
| GET     | /cars | List cars with filters and pagination |
| PATCH     | /cars/:id | Partially update car information |
| DELETE      | /cars/:id | Delete a car and its items |
