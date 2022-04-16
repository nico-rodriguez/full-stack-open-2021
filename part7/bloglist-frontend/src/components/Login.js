/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
import loginService from '../services/login';

function Login({ displayNotification }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await loginService.login(username, password);
      window.localStorage.setItem('user', JSON.stringify(data));
      setUsername('');
      setPassword('');
      dispatch(login(data));
    } catch (error) {
      displayNotification('wrong username or password', 'error', 5000);
    }
  };

  return (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            value={username}
            name='username'
            id='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type='password'
            value={password}
            name='password'
            id='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </>
  );
}

export default Login;
