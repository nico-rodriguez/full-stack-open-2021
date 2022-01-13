import './Blog.css';
import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleLike = async () => {
    const updatedBlog = await blogService.update({ ...{
      title: blog.title, author: blog.author, url: blog.url
    }, likes: blog.likes + 1 }, blog.id );
    updateBlog(blog.id, updatedBlog);
  }

  const handleRemove = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id);
      removeBlog(blog.id);
    }
  }
  
  return (
    <div className={'blog'}>
      <p style={{ display: 'inline-block' }}>{blog.title}</p>
        <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
      <div style={{ display: showDetails ? '' : 'none'}}>
        <p>{blog.author}</p>
        <p style={{ display: 'inline-block' }}>{blog.likes}</p><button onClick={handleLike}>Like</button>
        <p>{blog.url}</p>
      </div>
      {removeBlog && <button onClick={handleRemove}>Remove</button>}
    </div>
  )
}

export default Blog