import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const USER_FAVORITE_GENRE = gql`
  query {
    me {
      favoriteGenre
    }
  }
`;
