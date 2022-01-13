const Logout = ({ username, setUser }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
  }

  return <>
  <p>{username} logged in</p>
  <button onClick={handleLogout}>Logout</button>
  </>;
};

export default Logout;