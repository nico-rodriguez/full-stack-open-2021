import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries/users';

const Login = ({ show, setToken }) => {
  const [login] = useMutation(LOGIN);

  if (!show) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const username = event.target.username.value;
    const password = event.target.password.value;

    const { data } = await login({ variables: { username, password } });
    const token = data.login.value;
    setToken(token);
    window.localStorage.setItem('user-token', token);

    event.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        username
        <input type='text' name='username' />
      </label>
      <br />
      <label>
        password
        <input type='password' name='password' />
      </label>
      <br />
      <button type='submit'>login</button>
    </form>
  );
};

export default Login;
