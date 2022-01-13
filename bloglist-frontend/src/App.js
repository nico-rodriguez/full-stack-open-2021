import { useState, useEffect } from 'react';
import blogService from './services/blogs'
import Login from './components/Login';
import Logout from './components/Logout';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errMsg, setErrMsg] = useState(null);
  const [notificationType, setNotificationType] = useState('error');

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, []);

  useEffect(() => {
    const userCredentials = window.localStorage.getItem('user');
    if (userCredentials) {
      setUser(JSON.parse(userCredentials));
    }
  }, []);

  const displayNotification = (message, notificationType, timeOut) => {
    setErrMsg(message);
    setNotificationType(notificationType);
    setTimeout(() => setErrMsg(null), timeOut);
  }

  const addBlog = (blog) => {
    setBlogs([...blogs, blog]);
  }

  return (
    <>
       <Notification message={errMsg} notificationType={notificationType}/>
      {user
        ? <>
          <h2>blogs</h2>
          <BlogList blogs={blogs} />
          <Logout username={user.username} setUser={setUser} />
          <Togglable buttonLabel="Create new blog">
            <BlogForm addBlog={addBlog} displayNotification={displayNotification} />
          </Togglable>
        </>
        : <Login setUser={setUser} displayNotification={displayNotification} />
      }
    </>
  )
}

export default App;