import { useState, useEffect } from 'react';
import blogService from './services/blogs';
import Login from './components/Login';
import Logout from './components/Logout';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [notificationType, setNotificationType] = useState('error');

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
    setErrMsg(message);
    setNotificationType(type);
    setTimeout(() => setErrMsg(null), timeOut);
  };

  const addBlog = (blog) => {
    setBlogs([...blogs, blog]);
  };

  const updateBlog = (blogId, updatedBlog) => {
    setBlogs(blogs.map((blog) => (blog.id === blogId ? updatedBlog : blog)));
  };

  const removeBlog = (blogId) => {
    setBlogs(blogs.filter(({ id }) => id !== blogId));
  };

  return (
    <>
      <Notification message={errMsg} notificationType={notificationType} />
      {user ? (
        <>
          <h2>blogs</h2>
          <BlogList
            blogs={blogs}
            displayNotification={displayNotification}
            updateBlog={updateBlog}
            removeBlog={removeBlog}
          />
          <Logout username={user.username} setUser={setUser} />
          <Togglable buttonLabel="Create new blog">
            <BlogForm
              addBlog={addBlog}
              displayNotification={displayNotification}
            />
          </Togglable>
        </>
      ) : (
        <Login setUser={setUser} displayNotification={displayNotification} />
      )}
    </>
  );
}

export default App;
