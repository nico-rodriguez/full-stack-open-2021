const { gql } = require('apollo-server-core');

module.exports = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Query {
    me: User
  }

  type Mutation {
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;
