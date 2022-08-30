import { gql } from '@apollo/client';
import { BOOK_DETAILS } from '../queries/books';

export const BOOK_ADDED = gql`
  ${BOOK_DETAILS}

  subscription {
    bookAdded {
      ...BookDetails
    }
  }
`;
