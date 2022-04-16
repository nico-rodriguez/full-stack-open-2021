/* eslint-disable no-confusing-arrow */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { List } from 'semantic-ui-react';

function BlogList() {
  const blogs = useSelector((state) =>
    [...state.blogs].sort(
      ({ likes: likes1 }, { likes: likes2 }) => likes2 - likes1
    )
  );

  return (
    <List>
      {blogs.map((blog) => (
        <List.Item key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </List.Item>
      ))}
    </List>
  );
}

export default BlogList;
