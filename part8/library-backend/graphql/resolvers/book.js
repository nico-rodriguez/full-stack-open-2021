const { UserInputError, AuthenticationError } = require('apollo-server');
const { PubSub } = require('graphql-subscriptions');

const Author = require('../../models/author.js');
const Book = require('../../models/book.js');

const pubSub = new PubSub();

module.exports = {
  Query: {
    bookCount: async () => Book.countDocuments({}),
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
    allBooksOfFavoriteGenre: async (root, args, context) => {
      const { currentUser } = context;
      if (!currentUser) {
        throw new AuthenticationError('Not authenticated');
      }

      const genre = currentUser.favoriteGenre;

      return await Book.find({ genres: { $in: [genre] } }).populate('author');
    },
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
          const newAuthorDoc = await Author.create({ name, bookCount: 1 });
          authorId = newAuthorDoc._id;
        } catch ({ message }) {
          throw new UserInputError(message, { invalidArgs: name });
        }
      } else {
        authorDoc.bookCount += 1;
        await authorDoc.save();
        authorId = authorDoc._id;
      }

      try {
        const book = await Book.create({
          title,
          published,
          author: authorId,
          genres,
        });
        await book.populate('author');

        pubSub.publish('BOOK_ADDED', { bookAdded: book });

        return book.populate('author');
      } catch ({ message }) {
        throw new UserInputError(message, { invalidArgs: title });
      }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubSub.asyncIterator(['BOOK_ADDED']),
    },
  },
};
