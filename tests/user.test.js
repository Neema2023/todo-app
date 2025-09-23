const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const User = require('../models/User');

let token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await User.deleteMany({});

  // Create a test user and login
  const resRegister = await request(app).post('/api/auth/register').send({
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'password123',
  });

  const resLogin = await request(app).post('/api/auth/login').send({
    email: 'testuser@example.com',
    password: 'password123',
  });

  token = resLogin.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('User Profile Routes', () => {
  test('should get user profile', async () => {
    const res = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe('testuser@example.com');
    expect(res.body).not.toHaveProperty('password');
  });

  test('should update user password', async () => {
    const res = await request(app)
      .put('/api/users/password')
      .set('Authorization', `Bearer ${token}`)
      .send({ oldPassword: 'password123', newPassword: 'newpassword123' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Password updated successfully');
  });

  test('should fail to update with wrong old password', async () => {
    const res = await request(app)
      .put('/api/users/password')
      .set('Authorization', `Bearer ${token}`)
      .send({ oldPassword: 'wrongpassword', newPassword: 'newpassword123' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toBe('Old password incorrect');
  });
});
