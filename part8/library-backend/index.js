const { ApolloServer, gql, UserInputError } = require('apollo-server');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { default: mongoose } = require('mongoose');

const Author = require('./models/author.js');
const Book = require('./models/book.js');

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

MongoMemoryServer.create().then(async (mongod) => {
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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;

const resolvers = {
  Author: {
    // TODO
    bookCount: (root) =>
      books.filter(({ author }) => author === root.name).length,
  },
  Query: {
    bookCount: async () => Book.countDocuments({}),
    authorCount: async () => Author.countDocuments({}),
    // TODO
    allBooks: async (root, args) => {
      // // Filter by author
      // let filteredBooks = args.author
      //   ? books.filter((book) => book.author === args.author)
      //   : books;

      // // Filter by genre
      // filteredBooks = args.genre
      //   ? filteredBooks.filter((book) => book.genres.includes(args.genre))
      //   : filteredBooks;

      return Book.find({});
    },
    allAuthors: async () => Author.find({}),
  },
  Mutation: {
    addBook: async (root, args) => {
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
        const newAuthorDoc = await Author.create({ name });
        authorId = newAuthorDoc._id;
      } else {
        authorId = authorDoc._id;
      }

      const book = await Book.create({
        title,
        published,
        author: authorId,
        genres,
      });

      return book;
    },
    // TODO
    editAuthor: (root, args) => {
      const { name, setBornTo } = args;

      const author = authors.find((author) => author.name === name);
      if (!author) {
        throw new UserInputError('Author does not exist', {
          invalidArgs: author,
        });
      }

      if (setBornTo === 0) {
        throw new UserInputError('Invalid birthyear', {
          invalidArgs: setBornTo,
        });
      }

      const updatedAuthor = { ...author, born: setBornTo };
      authors = authors.map((author) =>
        author.name === name ? updatedAuthor : author
      );

      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
