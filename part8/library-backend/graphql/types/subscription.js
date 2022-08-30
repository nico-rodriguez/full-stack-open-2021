const { gql } = require('apollo-server-core');

module.exports = gql`
  type Subscription {
    bookAdded: Book!
  }
`;
