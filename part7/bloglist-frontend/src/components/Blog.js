import './Blog.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

function Blog({ blog, handleLike, handleRemove }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className='blog'>
      <p style={{ display: 'inline-block' }}>{blog.title}</p>
      <button type='button' onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'view'}
      </button>
      <div style={{ display: showDetails ? '' : 'none' }}>
        <p>{blog.author}</p>
        <p style={{ display: 'inline-block' }}>{blog.likes}</p>
        <button type='button' onClick={() => handleLike(blog)}>
          Like
        </button>
        <p>{blog.url}</p>
      </div>
      {handleRemove && (
        <button type='button' onClick={() => handleRemove(blog)}>
          Remove
        </button>
      )}
    </div>
  );
}

Blog.propTypes = {
  blog: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
  ).isRequired,
  handleLike: PropTypes.func.isRequired,
};

export default Blog;
