const mongoose = require('mongoose');
const supertest = require('supertest');
const config = require('../utils/config');
const app = require('../app');
const helper = require('./test_helper');
const { Blog } = require('../models/blog');

const api = supertest(app);

beforeAll(async () => {
  await mongoose.connect(config.MONGODB_URI);
});

beforeEach(async () => {
  await Blog.deleteMany({});
  await Promise.all(helper.initialBlogs.map((blog) => new Blog(blog).save()));
});

describe('retrieving blogs', () => {
  test('blogs are returned as json ', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned ', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('first blog title', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body[0].title).toBe('React patterns');
  });

  test('a specific blog title is among the returned ones', async () => {
    const response = await api.get('/api/blogs');
    const titles = response.body.map((blog) => blog.title);

    expect(titles).toContain('First class tests');
  });

  test('a specific blog is among the returned ones', async () => {
    const response = await api.get('/api/blogs');
    const contents = response.body.map(({
      title, author, url, likes
    }) => ({
      title, author, likes, url,
    }));

    expect(contents).toContainEqual({
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 0,
    });
  });

  test('blog to have id property', async () => {
    const response = await api.get('/api/blogs');

    response.body.forEach((blog) => expect(blog.id).toBeDefined());
  });
});

describe('adding blogs', () => {
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'TDD harms architecture 2',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture-2.html',
      likes: 100,
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const newBlogs = await helper.blogsInDB();
    expect(newBlogs).toHaveLength(helper.initialBlogs.length + 1);

    expect(newBlogs).toContainEqual(newBlog);
  });

  test('likes default to 0 when not specified', async () => {
    const newBlog = {
      title: 'TDD harms architecture 2',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture-2.html'
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const newBlogs = await helper.blogsInDB();
    const newSavedBlog = newBlogs.pop();

    expect(newSavedBlog.likes).toBeDefined();
    expect(newSavedBlog.likes).toBe(0);
  });

  test('title is required ', async () => {
    const newBlog = {
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture-2.html',
      likes: 100
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect((response) => 'error' in response.body === true);
  });

  test('url is required ', async () => {
    const newBlog = {
      title: 'TDD harms architecture 2',
      author: 'Robert C. Martin',
      likes: 100
    };

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      .expect((response) => 'error' in response.body === true);
  });
});

afterAll(() => {
  mongoose.connection.close();
});