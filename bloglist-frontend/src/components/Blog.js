import './Blog.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import blogService from '../services/blogs';

function Blog({ blog, displayNotification, updateBlog, removeBlog }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleLike = async () => {
    try {      
      const updatedBlog = await blogService.update({
        ...{
          title: blog.title, author: blog.author, url: blog.url,
        },
        likes: blog.likes + 1,
      }, blog.id);
      updateBlog(blog.id, updatedBlog);
    } catch (error) {
      displayNotification(error.message, 'error', 5000);
    }
  };

  const handleRemove = async () => {
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
    <div className="blog">
      <p style={{ display: 'inline-block' }}>{blog.title}</p>
      <button type="button" onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'view'}</button>
      <div style={{ display: showDetails ? '' : 'none' }}>
        <p>{blog.author}</p>
        <p style={{ display: 'inline-block' }}>{blog.likes}</p>
        <button type="button" onClick={handleLike}>Like</button>
        <p>{blog.url}</p>
      </div>
      {removeBlog && <button type="button" onClick={handleRemove}>Remove</button>}
    </div>
  );
}

Blog.propTypes = {
  blog: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])).isRequired,
  updateBlog: PropTypes.func,
  // eslint-disable-next-line react/require-default-props
  removeBlog: PropTypes.func,
};

export default Blog;
