# bloglist-backend

## Features

- Structure of backend application, introduction to testing
  - Project structure
  - Note on exports: single value vs object
  - Testing Node applications (`jest`)
- Testing the backend
  - Test environment (`NODE_ENV={production,development,test}`, `cross-env`, conditional configuration)
  - `supertest`
  - Initializing the database before tests
  - Array of promises
  - Running tests one by one
  - `async/await`
  - Error handling and `async/await`
  - Eliminating the `try-catch` (`express-async-errors` or `express-async-handler`)
- User administration
  - References across collections
  - Password hashes (`bcryptjs`, avoid leaking the password hash with `toJSON` in schema)
  - Mongoose `populate`
- Token authentication
  - `jsonwebtoken`
  - Limiting creating new notes to logged in users
  - Authentication error handling
  - Problems of token-base authentication: validity period and token database (e.g.: Redis)

## Running

Run the server in production mode: `npm start`; or in development mode: `npm run dev`.

The development server includes the automatic reload on save (thanks to `nodemon`).

It listens on the port given by the `PORT` environment variable (see `.env` file).

The server expects a MongoDB listening on `TEST_MONGODB_URI` (see `.env` file). For instance, for a local MongoDB at `mongodb/` folder run `mongod --dbpath=mongodb --bind_ip 127.0.0.1`.
