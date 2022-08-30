const { UserInputError, AuthenticationError } = require('apollo-server');

const Author = require('../../models/author.js');
const Book = require('../../models/book.js');

module.exports = {
  Query: {
    authorCount: async () => Author.countDocuments({}),
    allAuthors: async () => Author.find({}),
  },
  Mutation: {
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
  },
};
