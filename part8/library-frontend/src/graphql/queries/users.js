import { gql } from '@apollo/client';

export const USER_FAVORITE_GENRE = gql`
  query {
    me {
      favoriteGenre
    }
  }
`;
