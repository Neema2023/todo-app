
# Todo Management API

A secure RESTful API built with Node.js, Express, MongoDB, and JWT Authentication. The application allows users to register, log in, manage their profiles, and create personal todo tasks.

## Features

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- User Profile Management
- Password Update
- Create Todo Tasks
- Update Todo Tasks
- Delete Todo Tasks
- MongoDB Integration
- Password Hashing with bcrypt

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Tokens)
- bcrypt
- Jest
- Supertest

## Project Structure

```text
backend/
├── controllers/
├── models/
│   ├── User.js
│   └── Todo.js
├── routes/
│   ├── auth.js
│   ├── todo.js
│   └── user.js
├── server.js
├── app.js
└── package.json
```

## Installation

### Clone Repository

```bash
git clone https://github.com/Neema2023/todo-app.git
cd todo-app
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Running the Application

Development Mode

```bash
npm run dev
```

Production Mode

```bash
npm start
```

## API Endpoints

### Authentication

#### Register

```http
POST /api/auth/register
```

#### Login

```http
POST /api/auth/login
```

### User

#### Get Profile

```http
GET /api/users/profile
```

#### Update Password

```http
PUT /api/users/password
```

### Todos

#### Create Todo

```http
POST /api/todos
```

#### Get All Todos

```http
GET /api/todos
```

#### Update Todo

```http
PUT /api/todos/:id
```

#### Delete Todo

```http
DELETE /api/todos/:id
```

## Testing

Run all tests:

```bash
npm test
```

Generate coverage report:

```bash
npm run test:coverage
```

## Security

- Passwords are hashed using bcrypt.
- JWT is used for authentication.
- Protected routes require a valid token.
- User-specific task management.

## Future Improvements

- Role-Based Access Control (RBAC)
- Email Verification
- Password Reset
- Pagination and Filtering
- API Documentation with Swagger

## Author

Neema Zaninka
