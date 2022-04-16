import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import users from '../services/users';

function User() {
  const [user, setUser] = useState(null);
  const { userId } = useParams();

  useEffect(() => {
    users.getOne(userId).then((response) => {
      setUser(response);
    });
  }, [userId]);

  return user ? (
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(({ title, id }) => (
          <p key={id}>{title}</p>
        ))}
      </ul>
    </>
  ) : null;
}

export default User;
