const { gql } = require('apollo-server-core');

module.exports = gql`
  type Token {
    value: String!
  }
`;
