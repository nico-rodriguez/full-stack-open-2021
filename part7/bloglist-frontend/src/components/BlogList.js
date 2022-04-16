/* eslint-disable no-confusing-arrow */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
import { useSelector } from 'react-redux';
import Blog from './Blog';

function BlogList({ handleLike, handleRemove }) {
  const user = useSelector((state) => state.user);
  const { username } = user;
  const blogs = useSelector((state) =>
    state.blogs.sort(({ likes: likes1 }, { likes: likes2 }) => likes2 - likes1)
  );

  return (
    <>
      {blogs.map((blog) =>
        blog.user && blog.user.username === username ? (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
          />
        ) : (
          <Blog key={blog.id} blog={blog} handleLike={handleLike} />
        )
      )}
    </>
  );
}

export default BlogList;
