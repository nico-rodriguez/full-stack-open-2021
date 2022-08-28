const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');

const User = require('../models/user.js');

const typeDefs = require('./types.js');
const resolvers = require('./resolvers.js');

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY';

module.exports = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const { authorization } = req.headers;
    const isBearerToken = authorization?.toLowerCase().startsWith('bearer ');
    if (authorization && isBearerToken) {
      const token = authorization.substring(7);
      const decodedToken = jwt.verify(token, JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);

      return { currentUser };
    }
  },
});
