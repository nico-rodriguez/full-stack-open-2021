/* eslint-disable no-underscore-dangle */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const User = require('../models/user');

loginRouter.post('/', async (request, response, next) => {
  try {
    const { username, password } = request.body;

    const user = await User.findOne({ username });
    if (!user) {
      return response.status(401).json({ error: 'invalid username or password' });
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);
    if (!passwordCorrect) {
      return response.status(401).json({ error: 'invalid username or password' });
    }

    const userForToken = {
      username,
      id: user._id
    };

    // token expires in one hour
    const token = jwt.sign(userForToken, process.env.SECRET, {
      expiresIn: 60 * 60
    });

    response.status(200).json({ token, username, name: user.name });
  } catch (error) {
    next(error);
  }
});

module.exports = loginRouter;
