import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login';
import Logout from './components/Logout';

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
  }, [])

  const blogsList = blogs.map(blog =>
    <Blog key={blog.id} blog={blog} />
  );

  return (
    <>
      {user
        ? <>
          <h2>blogs</h2>
          <Logout username={user.username} setUser={setUser} />
          {blogsList}
        </>
        : <Login setUser={setUser} />
      }
    </>
  )
}

export default App