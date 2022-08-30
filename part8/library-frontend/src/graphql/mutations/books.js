import { gql } from '@apollo/client';
import { BOOK_DETAILS } from '../fragments/books';

export const ADD_BOOK = gql`
  ${BOOK_DETAILS}

  mutation AddBook(
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      ...BookDetails
    }
  }
`;
