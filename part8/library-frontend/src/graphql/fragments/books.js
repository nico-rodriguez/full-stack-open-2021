import { gql } from '@apollo/client';

export const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    author {
      name
      born
      bookCount
    }
    genres
  }
`;
