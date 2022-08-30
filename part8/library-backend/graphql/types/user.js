const { gql } = require('apollo-server-core');

module.exports = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
`;
