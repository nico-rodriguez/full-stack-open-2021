import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import Login from './components/Login';
import NewBook from './components/NewBook';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'http://localhost:4000',
    }),
  });

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
              <button onClick={handleLogout}>logout</button>
            </>
          ) : (
            <button onClick={() => setPage('login')}>login</button>
          )}
        </div>

        <Authors show={page === 'authors'} />

        <Books show={page === 'books'} />

        <NewBook show={page === 'add'} />

        <Login show={page === 'login'} setToken={setToken} />
      </div>
    </ApolloProvider>
  );
};

export default App;
