import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import blogService from './services/blogs';
import Login from './components/Login';
import Logout from './components/Logout';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { clear, set } from './redux/notificationSlice';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogsList) => setBlogs(blogsList));
  }, []);

  useEffect(() => {
    const userCredentials = window.localStorage.getItem('user');
    if (userCredentials) {
      setUser(JSON.parse(userCredentials));
    }
  }, []);

  const displayNotification = (message, type, timeOut) => {
    dispatch(set({ message, type }));
    setTimeout(() => dispatch(clear()), timeOut);
  };

  const addBlog = async ({ title, author, url }) => {
    try {
      const newBlog = await blogService.create(title, author, url);
      setBlogs([...blogs, newBlog]);
      displayNotification('Blog added successfully!', 'success', 5000);
    } catch (error) {
      displayNotification(error.message, 'error', 5000);
    }
  };

  const updateBlog = (blogId, updatedBlog) => {
    setBlogs(blogs.map((blog) => (blog.id === blogId ? updatedBlog : blog)));
  };

  const handleLike = async (blog) => {
    try {
      const updatedBlog = await blogService.update(
        {
          ...{
            title: blog.title,
            author: blog.author,
            url: blog.url,
          },
          likes: blog.likes + 1,
        },
        blog.id
      );
      updateBlog(blog.id, updatedBlog);
    } catch (error) {
      displayNotification(error.message, 'error', 5000);
    }
  };

  const removeBlog = (blogId) => {
    setBlogs(blogs.filter(({ id }) => id !== blogId));
  };

  const handleRemove = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        await blogService.remove(blog.id);
        removeBlog(blog.id);
      }
    } catch (error) {
      displayNotification(error.message, 'error', 5000);
    }
  };

  return (
    <>
      <Notification
        message={notification.message}
        notificationType={notification.type}
      />
      {user ? (
        <>
          <h2>blogs</h2>
          <BlogList
            blogs={blogs}
            handleLike={handleLike}
            handleRemove={handleRemove}
          />
          <Logout username={user.username} setUser={setUser} />
          <Togglable buttonLabel='Create new blog'>
            <BlogForm addBlog={addBlog} />
          </Togglable>
        </>
      ) : (
        <Login setUser={setUser} displayNotification={displayNotification} />
      )}
    </>
  );
}

export default App;
