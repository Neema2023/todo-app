// 🔹 Load environment variables
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user'); // Routes for profile management
const todoRoutes = require('./routes/todo'); // 🔹 Added Todo routes

const app = express();

// 🔹 Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Only one express.json with limit

// 🔹 Main route
app.get('/', (req, res) => {
  res.send('🚀 Todo App API is running');
});

// 🔹 Auth routes
app.use('/api/auth', authRoutes);

// 🔹 User profile routes (requires JWT token)
app.use('/api/user', userRoutes);

// 🔹 Todo routes (requires JWT token)
app.use('/api/todos', todoRoutes); // 🔹 Added

module.exports = app;
