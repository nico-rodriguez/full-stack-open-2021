import { useApolloClient, useSubscription } from '@apollo/client';
import { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import Login from './components/Login';
import NewBook from './components/NewBook';
import Recommended from './components/Recommended';
import { ALL_AUTHORS } from './graphql/queries/authors';
import {
  ALL_BOOKS,
  ALL_BOOKS_OF_FAVORITE_GENRE,
  ALL_BOOKS_OF_GENRE,
} from './graphql/queries/books';
import { BOOK_ADDED } from './graphql/subscriptions/books';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);

  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: async ({ subscriptionData }) => {
      const { bookAdded } = subscriptionData.data;

      window.alert(`New book added: ${bookAdded.title}`);

      // Update cache of all books
      client.cache.updateQuery({ query: ALL_BOOKS }, (data) => {
        if (data) {
          const { allBooks } = data;
          return {
            allBooks: allBooks
              // remove book from cache if already there
              .filter((book) => book.title !== bookAdded.title)
              // add book to cache
              .concat(bookAdded),
          };
        }

        return null;
      });

      // Update cache of books for each genre
      const bookAddedGenres = bookAdded.genres;
      bookAddedGenres.forEach((genre) => {
        client.cache.updateQuery(
          { query: ALL_BOOKS_OF_GENRE, variables: { genre } },
          (data) => {
            if (data) {
              const { allBooks } = data;

              return {
                allBooks: allBooks.concat(bookAdded),
              };
            }

            return null;
          }
        );
      });

      const addedBookAuthor = bookAdded.author;
      // Update cache of authors
      client.cache.updateQuery({ query: ALL_AUTHORS }, (data) => {
        if (data) {
          const { allAuthors } = data;

          const isAuthorInCache = allAuthors
            .map(({ name }) => name)
            .includes(addedBookAuthor.name);

          if (isAuthorInCache) {
            const allAuthorsUpdated = allAuthors.map(
              ({ name, born, bookCount }) =>
                name === addedBookAuthor.name
                  ? { name, born, bookCount: bookCount + 1 }
                  : { name, born, bookCount }
            );

            return { allAuthors: allAuthorsUpdated };
          } else {
            return { allAuthors: allAuthors.concat(addedBookAuthor) };
          }
        }

        return null;
      });
    },
  });

  const handleLogin = () => {
    setPage('authors');
  };

  const handleLogout = () => {
    setToken(null);
    window.localStorage.removeItem('user-token');
  };

  useEffect(() => {
    const tokenStored = window.localStorage.getItem('user-token');
    tokenStored && setToken(tokenStored);
  }, []);

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      {token && <Recommended show={page === 'recommended'} />}

      <Login
        show={page === 'login'}
        onLogin={handleLogin}
        setToken={setToken}
      />
    </div>
  );
};

export default App;
