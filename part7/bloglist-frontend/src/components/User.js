import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header, List } from 'semantic-ui-react';
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
      <Header as='h2'>{user.name}</Header>
      <Header as='h3'>added blogs</Header>
      <List bulleted>
        {user.blogs.map(({ title, id }) => (
          <List.Item key={id}>{title}</List.Item>
        ))}
      </List>
    </>
  ) : null;
}

export default User;
