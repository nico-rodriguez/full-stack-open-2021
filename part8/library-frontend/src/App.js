import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import Login from './components/Login';
import NewBook from './components/NewBook';
import Recommended from './components/Recommended';
import { USER_FAVORITE_GENRE } from './queries/users';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);

  const favoriteGenreQuery = useQuery(USER_FAVORITE_GENRE);

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

      {!favoriteGenreQuery.loading && (
        <Recommended
          show={page === 'recommended'}
          favoriteGenre={favoriteGenreQuery.data.me.favoriteGenre}
        />
      )}

      <Login
        show={page === 'login'}
        onLogin={handleLogin}
        setToken={setToken}
      />
    </div>
  );
};

export default App;
