import { useState, useEffect } from 'react';
import blogService from './services/blogs'
import Login from './components/Login';
import Logout from './components/Logout';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, []);

  useEffect(() => {
    const userCredentials = window.localStorage.getItem('user');
    if (userCredentials) {
      setUser(JSON.parse(userCredentials));
    }
  }, []);

  const addBlog = (blog) => {
    setBlogs([...blogs, blog]);
  }

  return (
    <>
      {user
        ? <>
          <h2>blogs</h2>
          <BlogList blogs={blogs} />
          <Logout username={user.username} setUser={setUser} />
          <BlogForm addBlog={addBlog} />
        </>
        : <Login setUser={setUser} />
      }
    </>
  )
}

export default App;