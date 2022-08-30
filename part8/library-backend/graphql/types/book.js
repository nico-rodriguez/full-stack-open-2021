const { gql } = require('apollo-server-core');

module.exports = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
`;
