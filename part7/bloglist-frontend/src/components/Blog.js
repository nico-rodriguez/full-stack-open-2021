/* eslint-disable react/jsx-one-expression-per-line */
import './Blog.css';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Blog({ blog, handleLike, handleRemove }) {
  const { blogId } = useParams();
  const singleBlog = useSelector(
    (state) => state.blogs.find(({ id }) => id === blogId) || blog
  );
  const user = useSelector((state) => state.user);

  return singleBlog ? (
    <div className='blog'>
      <p style={{ display: 'inline-block' }}>{singleBlog.title}</p>
      <a style={{ display: 'block' }} href={singleBlog.url}>
        {singleBlog.url}
      </a>
      <div>
        <p style={{ display: 'inline-block' }}>{singleBlog.likes}</p>
        <button type='button' onClick={() => handleLike(singleBlog)}>
          Like
        </button>
        <p>added by {singleBlog.author}</p>
      </div>
      {singleBlog.user.username === user.username && (
        <button type='button' onClick={() => handleRemove(singleBlog)}>
          Remove
        </button>
      )}
    </div>
  ) : null;
}

Blog.propTypes = {
  // eslint-disable-next-line react/require-default-props
  blog: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object])
  ),
  handleLike: PropTypes.func.isRequired,
};

export default Blog;
