const { gql } = require('apollo-server-core');

module.exports = gql`
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allBooksOfFavoriteGenre: [Book!]!
    allAuthors: [Author!]!
    me: User
  }
`;
