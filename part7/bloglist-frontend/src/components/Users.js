import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header, Table } from 'semantic-ui-react';
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
      <Header as='h2'>Users</Header>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>&nbsp;</Table.HeaderCell>
            <Table.HeaderCell>blogs created</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {usersList.map(({ name, blogs, id }) => (
            <Table.Row key={id}>
              <Table.Cell>
                <Link to={`${id}`}>{name}</Link>
              </Table.Cell>
              <Table.Cell>{blogs.length}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

export default Users;
