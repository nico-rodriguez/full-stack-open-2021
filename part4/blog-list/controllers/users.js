const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response, next) => {
  if (!request.body.password) {
    return response.status(400).send({ error: 'password is required' });
  }

  if (request.body.password.length < 3) {
    return response.status(400).send({ error: 'password must be at least 3 characters long' });
  }

  try {
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(request.body.password, saltRounds);
    const newUser = { ...request.body, passwordHash };

    const user = new User(newUser);
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (error) {
    next(error);
  }
});

usersRouter.get('/', async (request, response, next) => {
  try {
    const users = await User.find({}).populate('blogs', {
      title: 1, author: 1, url: 1, _id: 1
    });
    response.status(200).json(users);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
