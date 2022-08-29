const { MongoMemoryServer } = require('mongodb-memory-server');
const { default: mongoose } = require('mongoose');

const startGraphQLServer = require('./apollo/server.js');

const Author = require('./models/author.js');
const Book = require('./models/book.js');
const User = require('./models/user.js');

const authors = require('./data/authors.js');
const books = require('./data/books.js');
const users = require('./data/users.js');

MongoMemoryServer.create({
  instance: {
    port: 27017,
  },
}).then(async (mongod) => {
  const uri = mongod.getUri();

  mongoose.connect(uri);

  // Initialize database with default data
  await Author.create(authors);
  for (const book of books) {
    const { title, published, author, genres } = book;
    const authorId = await Author.findOne({ name: author });

    await Book.create({ title, published, author: authorId, genres });
  }
  await User.create(users);
});

startGraphQLServer();
