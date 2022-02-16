import Blog from './Blog';

function BlogList({ blogs, handleLike, handleRemove }) {
  return (
    <>
      {[...blogs]
        .sort(({ likes: likes1 }, { likes: likes2 }) => likes2 - likes1)
        .map((blog) => {
          const user = window.localStorage.getItem('user');
          const { username } = JSON.parse(user);

          return blog.user && blog.user.username === username
            ? <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} />
            : <Blog key={blog.id} blog={blog} handleLike={handleLike} />;
        })}
    </>
  );
}

export default BlogList;
