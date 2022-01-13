import { useState } from "react";
import loginService from "../services/login";

const Login = ({ setUser, displayNotification }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const data = await loginService.login(username, password);
      window.localStorage.setItem('user', JSON.stringify(data));
      setUsername('');
      setPassword('');
      setUser(data);
    } catch (error) {
      displayNotification('wrong username or password', 'error', 5000);
    }
  };

  return <>
    <h2>Log in to application</h2>
    <form onSubmit={handleLogin}>
      <div>
        <label htmlFor="username">Username</label>
        <input type="text" value={username} name="username" id="username" onChange={({ target }) => setUsername(target.value)}></input>
      </div>
      <div>
        <label>Password</label>
        <input type="password" value={password} name="password" id="password" onChange={({ target }) => setPassword(target.value)}></input>
      </div>
      <button type="submit">Login</button>
    </form>
  </>};

export default Login;