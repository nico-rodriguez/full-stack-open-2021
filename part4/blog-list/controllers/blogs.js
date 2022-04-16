/* eslint-disable no-underscore-dangle */
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate('user', {
      username: 1,
      name: 1,
    });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id).populate('user', {
      username: 1,
      name: 1,
    });
    response.json(blog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    const user = await User.findById(request.userId);
    const blogToSave = new Blog({
      ...request.body,
      user: user._id, // assign the user id to the blog
    });
    const blog = await blogToSave.save();

    // assign the blog to the user
    user.blogs = user.blogs.concat(blog._id);
    await user.save();
    await blog.populate('user', { username: 1, name: 1, _id: 1 });
    response.status(201).json(blog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true, runValidators: true }
    ).populate('user', { username: 1, name: 1, _id: 1 });
    response.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);
    if (request.userId !== blog.user.toString()) {
      return response
        .status(401)
        .json({ error: 'unauthorized to delete this blog' });
    }

    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = blogsRouter;
