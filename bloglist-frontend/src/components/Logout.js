function Logout({ username, setUser }) {
  const handleLogout = () => {
    window.localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <>
      <p style={{ display: 'inline-block' }}>
        {username}
        {' '}
        logged in
      </p>
      <button type="button" onClick={handleLogout}>Logout</button>
    </>
  );
}

export default Logout;
