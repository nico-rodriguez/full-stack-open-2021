const { gql } = require('apollo-server-core');

module.exports = gql`
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    authorCount: Int!
    allAuthors: [Author!]!
  }

  type Mutation {
    editAuthor(name: String!, setBornTo: Int!): Author
  }
`;
