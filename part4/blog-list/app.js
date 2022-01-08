const express = require('express');
const cors = require('cors');
const middleware = require('./utils/middleware');

const app = express();
const blogsRouter = require('./controllers/blogs');

app.use(cors());
app.use(express.static('build'));
app.use(express.json());
app.use(middleware.requestLogger);

app.use('/api/blogs', blogsRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
