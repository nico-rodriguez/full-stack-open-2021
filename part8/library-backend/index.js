const { MongoMemoryServer } = require('mongodb-memory-server');
const { default: mongoose } = require('mongoose');

const server = require('./apollo/server.js');

const Author = require('./models/author.js');
const Book = require('./models/book.js');

const authors = require('./data/authors.js');
const books = require('./data/books.js');

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
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
