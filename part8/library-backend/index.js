const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server');
const jwt = require('jsonwebtoken');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { default: mongoose } = require('mongoose');

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY';

const Author = require('./models/author.js');
const Book = require('./models/book.js');
const User = require('./models/user.js');

let authors = [
  {
    name: 'Robert Martin',
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    born: 1963,
  },
  {
    name: 'Fyodor Dostoevsky',
    born: 1821,
  },
  {
    name: 'Joshua Kerievsky', // birthyear not known
  },
  {
    name: 'Sandi Metz', // birthyear not known
  },
];

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    genres: ['refactoring'],
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    genres: ['agile', 'patterns', 'design'],
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    genres: ['refactoring'],
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    genres: ['refactoring', 'patterns'],
  },
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    genres: ['refactoring', 'design'],
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'crime'],
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    genres: ['classic', 'revolution'],
  },
];

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

const typeDefs = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
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

const server = new ApolloServer({
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

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
