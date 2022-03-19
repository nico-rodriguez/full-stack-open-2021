# phonebook-backend

## Features

- Node.js and Express
  - Express
  - `nodemon`
  - REST
  - Fetching a single resource
  - Deleting resources
  - Postman
  - The Visual Studio Code REST client
  - Receiving data
  - About HTTP request types (Idempotence)
  - Middleware
- Deploying app to internet
  - Same origin policy and CORS
  - Application to the internet (Heroku)
  - Frontend production build
  - Serving static files from the backend
  - The whole app to internet
  - Streamlining deploying of the frontend
  - Proxy
- Saving data to MongoDB
  - MongoDB
  - Schema
  - Creating and saving objects
  - Fetching objects from the database
  - Backend connected to a database
  - Mongoose `toJSON`
  - Database configuration into its own module
  - Using database in route handlers
  - Verifying frontend and backend integration
  - Error handling
  - Moving error handling into middleware
  - The order of the middleware loading
- Validation and ESLint
  - Mongoose validation
  - Deploying the database backend to production
  - Lint

## About

This is the backend, written in NodeJS, for the phonebook.

## Prerequisites

NodeJS version 14.x.x (at least).

## Deploying

First, the Heroku application was created with `heroku create`. The application was assigned the name `damp-chamber-99299`.

Then, the repository for it was created with `heroku git:remote -a damp-chamber-99299`.

In order to deploy the backend, from the root folder run

``` bash
git subtree push --prefix part3/phonebook-backend heroku master
```

This pushes only the subdirectory to the heroku remote.

## Usage

### Locally

Run the server with `npm start`. Alternatively, run it on development mode, which enables hot reload, with `npm run dev`.

### Remotely

View Heroku logs with `heroku logs -t`.
