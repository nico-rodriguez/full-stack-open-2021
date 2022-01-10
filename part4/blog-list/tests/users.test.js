const mongoose = require('mongoose');
const supertest = require('supertest');
const config = require('../utils/config');
const helper = require('./users_test_helper');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

beforeAll(async () => {
  await mongoose.connect(config.MONGODB_URI);
});

beforeEach(async () => {
  await User.deleteMany({});
  await Promise.all(helper.initialUsers.map(async ({ username, name, password }) => {
    await api
      .post('/api/users')
      .send({ username, name, password })
      .expect(201)
      .expect('Content-Type', /application\/json/);
  }));
});

describe('user creation', () => {
  test('should get all users', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
      .then((response) => {
        expect(response.body).toHaveLength(helper.initialUsers.length);
      });
  });

  test('should create a new user', async () => {
    const newUser = {
      username: 'awesomeUsername',
      name: 'awesomeName',
      password: 'password'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const newUserList = await helper.usersInDB();
    expect(newUserList).toHaveLength(helper.initialUsers.length + 1);
    const lastSavedUser = newUserList.pop();
    expect(lastSavedUser.username).toBe(newUser.username);
    expect(lastSavedUser.name).toBe(newUser.name);
    expect(lastSavedUser.passwordHash).toBe(newUser.passwordHash);
  });

  test('username should be at least 3 characters long', async () => {
    const newUser = {
      username: 'aa',
      name: 'awesomeName',
      password: 'password'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect((response) => 'error' in response.body === true);
  });

  test('password should be at least 3 characters long', async () => {
    const newUser = {
      username: 'awesomeUsername',
      name: 'awesomeName',
      password: '11'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect((response) => 'error' in response.body === true);
  });

  test('username must be unique', async () => {
    const newUser = {
      username: 'rambo',
      name: 'awesomeName',
      password: 'password'
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect((response) => 'error' in response.body === true);
  });
});

afterAll(async () => {
  mongoose.connection.close();
});
