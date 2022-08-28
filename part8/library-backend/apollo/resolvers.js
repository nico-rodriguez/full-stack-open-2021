const { UserInputError, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');

const Author = require('../models/author.js');
const Book = require('../models/book.js');
const User = require('../models/user.js');

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY';

module.exports = {
  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root.id }),
  },
  Query: {
    bookCount: async () => Book.countDocuments({}),
    authorCount: async () => Author.countDocuments({}),
    allBooks: async (root, args) => {
      const { author, genre } = args;

      const filter = {};

      // Filter by author
      if (author) {
        const authorDoc = await Author.findOne({ name: author });
        filter.author = authorDoc?._id;
      }

      // Filter by genre
      if (genre) {
        filter.genres = { $in: [genre] };
      }

      return await Book.find(filter).populate('author');
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const { currentUser } = context;
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated');
      }

      const { title, published, author: name, genres } = args;

      if (title === '') {
        throw new UserInputError('Title must be specified', {
          invalidArgs: title,
        });
      }

      if (name === '') {
        throw new UserInputError('Author must be specified', {
          invalidArgs: name,
        });
      }

      if (genres.length === 0) {
        throw new UserInputError('Some genre must be specified', {
          invalidArgs: genres,
        });
      }

      let authorId;
      const authorDoc = await Author.findOne({ name });

      if (!authorDoc) {
        try {
          const newAuthorDoc = await Author.create({ name });
          authorId = newAuthorDoc._id;
        } catch ({ message }) {
          throw new UserInputError(message, { invalidArgs: name });
        }
      } else {
        authorId = authorDoc._id;
      }

      try {
        const book = await Book.create({
          title,
          published,
          author: authorId,
          genres,
        });

        return book.populate('author');
      } catch ({ message }) {
        throw new UserInputError(message, { invalidArgs: title });
      }
    },
    editAuthor: async (root, args, context) => {
      const { currentUser } = context;
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated');
      }

      const { name, setBornTo } = args;

      const author = await Author.findOne({ name });
      if (!author) {
        throw new UserInputError('Author does not exist', {
          invalidArgs: name,
        });
      }

      if (setBornTo <= 0) {
        throw new UserInputError('Invalid birthyear', {
          invalidArgs: setBornTo,
        });
      }

      author.born = setBornTo;
      const authorUpdated = await author.save();

      return authorUpdated;
    },
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
