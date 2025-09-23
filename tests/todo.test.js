const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');
const Todo = require('../models/Todo');

let token;
let todoId;

beforeAll(async () => {
  jest.setTimeout(20000); // increase timeout for async operations
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Clear collections
  await User.deleteMany({});
  await Todo.deleteMany({});

  // Register test user and get token
  const res = await request(app)
    .post('/api/auth/register')
    .send({ name: 'Todo User', email: 'todouser@example.com', password: 'password123' });

  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Todo Routes', () => {
  it('should create a todo', async () => {
    const res = await request(app)
      .post('/api/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Todo', description: 'Test description' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Todo');
    todoId = res.body._id;
  });

  it('should get all todos', async () => {
    const res = await request(app)
      .get('/api/todos')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a todo', async () => {
    const res = await request(app)
      .put(`/api/todos/${todoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Updated Todo', description: 'Updated description' });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Updated Todo');
  });

  it('should delete a todo', async () => {
    const res = await request(app)
      .delete(`/api/todos/${todoId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Todo deleted successfully');
  });
});
