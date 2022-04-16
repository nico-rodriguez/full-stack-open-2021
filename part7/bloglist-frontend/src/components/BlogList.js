/* eslint-disable no-confusing-arrow */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function BlogList() {
  const blogs = useSelector((state) =>
    [...state.blogs].sort(
      ({ likes: likes1 }, { likes: likes2 }) => likes2 - likes1
    )
  );

  return (
    <ul>
      {blogs.map((blog) => (
        <li key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default BlogList;
