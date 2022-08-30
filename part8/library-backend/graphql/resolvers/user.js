const { UserInputError, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

const User = require('../../models/user.js');

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY';

module.exports = {
  Query: {
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    createUser: async (root, args) => {
      const { username, favoriteGenre } = args;

      try {
        const newUser = await User.create({ username, favoriteGenre });

        return newUser;
      } catch ({ message }) {
        throw new UserInputError(message, { invalidArgs: username });
      }
    },
    login: async (root, args) => {
      const { username, password } = args;

      const user = await User.findOne({ username });
      if (!user || password !== 'secret') {
        throw new UserInputError('Wrong credentials');
      }

      const token = jwt.sign({ username, id: user._id }, JWT_SECRET);
      return { value: token };
    },
  },
};
