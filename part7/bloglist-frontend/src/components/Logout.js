/* eslint-disable react/jsx-one-expression-per-line */
import { useDispatch, useSelector } from 'react-redux';
import { Button, Label } from 'semantic-ui-react';
import { clearUser } from '../redux/userSlice';

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    dispatch(clearUser());
  };

  return (
    <>
      <Label style={{ display: 'inline-block' }}>
        {user.username}&nbsp; logged in
      </Label>
      <Button type='button' onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
}

export default Logout;
