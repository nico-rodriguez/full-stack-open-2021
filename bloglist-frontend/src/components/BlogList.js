import Blog from './Blog';

function BlogList({ blogs, displayNotification, updateBlog, removeBlog }) {
  return (
    <>
      {[...blogs]
        .sort(({ likes: likes1 }, { likes: likes2 }) => likes2 - likes1)
        .map((blog) => {
          const user = window.localStorage.getItem('user');
          const { username } = JSON.parse(user);

          return blog.user && blog.user.username === username
            ? <Blog key={blog.id} blog={blog} displayNotification={displayNotification} updateBlog={updateBlog} removeBlog={removeBlog} />
            : <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />;
        })}
    </>
  );
}

export default BlogList;
