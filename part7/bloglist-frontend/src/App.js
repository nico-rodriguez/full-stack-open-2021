/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable object-curly-newline */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route, Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
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
import Users from './components/Users';
import User from './components/User';
import Blog from './components/Blog';

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
    <>
      <Menu>
        {user && (
          <>
            <Menu.Item>
              <Link to='/'>blogs</Link>
            </Menu.Item>
            <Menu.Item>
              <Link to='/users'>users</Link>
            </Menu.Item>
            <Menu.Item>
              <Logout />
            </Menu.Item>
          </>
        )}
        <Menu.Item header>blog app</Menu.Item>
      </Menu>
      <Notification message={notification.message} type={notification.type} />
      {!user && <Login displayNotification={displayNotification} />}
      <Routes>
        <Route
          path='/'
          element={
            user && (
              <>
                <Togglable buttonLabel='Create new blog'>
                  <BlogForm addBlog={handleAdd} />
                </Togglable>
                <BlogList handleLike={handleLike} handleRemove={handleRemove} />
              </>
            )
          }
        />
        <Route path='/users' element={user && <Users />} />
        <Route path='/users/:userId' element={user && <User />} />
        <Route
          path='/blogs/:blogId'
          element={<Blog handleLike={handleLike} handleRemove={handleRemove} />}
        />
      </Routes>
    </>
  );
}

export default App;
