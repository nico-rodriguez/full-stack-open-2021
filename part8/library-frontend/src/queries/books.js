const { gql } = require('@apollo/client');

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
      author {
        name
      }
      genres
    }
  }
`;

export const ALL_BOOKS_OF_GENRE = gql`
  query AllBooksOfGenre($genre: String!) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
      }
    }
  }
`;

export const ALL_BOOKS_OF_FAVORITE_GENRE = gql`
  query AllBooksOfFavoriteGenre {
    allBooksOfFavoriteGenre {
      title
      published
      author {
        name
      }
    }
  }
`;

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
