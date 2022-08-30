const http = require('http');

const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core');
const { execute, subscribe } = require('graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const express = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user.js');

const typeDefs = require('./types.js');
const resolvers = require('./resolvers.js');

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY';

const start = async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    { server: httpServer, path: '' }
  );

  const server = new ApolloServer({
    schema,
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
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();

  server.applyMiddleware({
    app,
    path: '/',
  });

  const PORT = 4000;

  httpServer.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
  });
};

module.exports = start;
