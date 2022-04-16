/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import blogService from './services/blogs';
import Login from './components/Login';
import Logout from './components/Logout';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import { clearNotification, setNotification } from './redux/notificationSlice';
import { setUser } from './redux/userSlice';
import { addBlog, removeBlog, setBlogs, updateBlog } from './redux/blogSlice';

function App() {
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogsList) => dispatch(setBlogs(blogsList)));
  }, []);

  useEffect(() => {
    const userCredentials = window.localStorage.getItem('user');
    if (userCredentials) {
      dispatch(setUser(JSON.parse(userCredentials)));
    }
  }, []);

  const displayNotification = (message, type, timeOut) => {
    dispatch(setNotification({ message, type }));
    setTimeout(() => dispatch(clearNotification()), timeOut);
  };

  const handleAdd = async ({ title, author, url }) => {
    try {
      const newBlog = await blogService.create(title, author, url);
      dispatch(addBlog(newBlog));
      displayNotification('Blog added successfully!', 'success', 5000);
    } catch (error) {
      displayNotification(error.message, 'error', 5000);
    }
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
      dispatch(updateBlog(updatedBlog));
    } catch (error) {
      displayNotification(error.message, 'error', 5000);
    }
  };

  const handleRemove = async (blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        await blogService.remove(blog.id);
        dispatch(removeBlog(blog.id));
      }
    } catch (error) {
      displayNotification(error.message, 'error', 5000);
    }
  };

  return (
    <Routes>
      <Route
        path='/'
        element={
          <>
            <Notification
              message={notification.message}
              type={notification.type}
            />
            {user ? (
              <>
                <h2>blogs</h2>
                <BlogList handleLike={handleLike} handleRemove={handleRemove} />
                <Logout />
                <Togglable buttonLabel='Create new blog'>
                  <BlogForm addBlog={handleAdd} />
                </Togglable>
              </>
            ) : (
              <Login displayNotification={displayNotification} />
            )}
          </>
        }
      />
    </Routes>
  );
}

export default App;