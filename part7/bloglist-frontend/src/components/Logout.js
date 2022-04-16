import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';

function Logout() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    window.localStorage.removeItem('user');
    dispatch(logout());
  };

  return (
    <>
      <p style={{ display: 'inline-block' }}>
        {user.username}
        logged in
      </p>
      <button type='button' onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}

export default Logout;
