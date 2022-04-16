/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Form, Header, Label, Input } from 'semantic-ui-react';
import { setUser } from '../redux/userSlice';
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
      dispatch(setUser(data));
    } catch (error) {
      displayNotification('wrong username or password', 'error', 5000);
    }
  };

  return (
    <>
      <Header as='h2'>Log in to application</Header>
      <Form onSubmit={handleLogin}>
        <Form.Field>
          <Label htmlFor='username'>Username</Label>
          <Input
            type='text'
            value={username}
            name='username'
            id='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Field>
        <Form.Field>
          <Label>Password</Label>
          <Input
            type='password'
            value={password}
            name='password'
            id='password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Field>
        <Button type='submit'>Login</Button>
      </Form>
    </>
  );
}

export default Login;
