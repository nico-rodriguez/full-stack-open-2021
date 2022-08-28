import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import Login from './components/Login';
import NewBook from './components/NewBook';
import Recommended from './components/Recommended';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);

  const authLink = setContext((_, { headers }) => {
    const token = window.localStorage.getItem('user-token');

    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : null,
      },
    };
  });

  const httpLink = new HttpLink({
    uri: 'http://localhost:4000',
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(httpLink),
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
    <ApolloProvider client={client}>
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          {token ? (
            <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommended')}>
                recommended
              </button>
              <button onClick={handleLogout}>logout</button>
            </>
          ) : (
            <button onClick={() => setPage('login')}>login</button>
          )}
        </div>

        <Authors show={page === 'authors'} />

        <Books show={page === 'books'} />

        <NewBook show={page === 'add'} />

        <Recommended show={page === 'recommended'} />

        <Login
          show={page === 'login'}
          onLogin={handleLogin}
          setToken={setToken}
        />
      </div>
    </ApolloProvider>
  );
};

export default App;
