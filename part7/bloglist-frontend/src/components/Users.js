import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import users from '../services/users';

function Users() {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    users.getAll().then((usersResponse) => {
      setUsersList(usersResponse);
    });
  }, []);

  return (
    <>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td>&nbsp;</td>
            <td>blogs created</td>
          </tr>
        </thead>
        <tbody>
          {usersList.map(({ name, blogs, id }) => (
            <tr key={id}>
              <td>
                <Link to={`${id}`}>{name}</Link>
              </td>
              <td>{blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Users;
