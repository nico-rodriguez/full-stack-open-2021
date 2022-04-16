/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-one-expression-per-line */
import './Blog.css';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Header, Input, List } from 'semantic-ui-react';
import blogs from '../services/blogs';
import { addComment } from '../redux/blogSlice';

function Blog({ blog, handleLike, handleRemove }) {
  const { blogId } = useParams();
  const dispatch = useDispatch();
  const singleBlog = useSelector(
    (state) => state.blogs.find(({ id }) => id === blogId) || blog
  );
  const user = useSelector((state) => state.user);

  const handleSendComment = (event) => {
    event.preventDefault();
    const comment = event.target.elements.comment.value;
    blogs
      .addComment(blogId, comment)
      .then(() => {
        dispatch(addComment({ id: blogId, comment }));
        event.target.reset();
      })
      .catch(console.error);
  };

  return singleBlog ? (
    <div className='blog'>
      <p style={{ display: 'inline-block' }}>{singleBlog.title}</p>
      <a style={{ display: 'block' }} href={singleBlog.url}>
        {singleBlog.url}
      </a>
      <div>
        <p style={{ display: 'inline-block' }}>{singleBlog.likes}</p>
        <Button type='button' onClick={() => handleLike(singleBlog)}>
          Like
        </Button>
        <p>added by {singleBlog.author}</p>
      </div>
      {singleBlog.user.username === user.username && (
        <Button type='button' onClick={() => handleRemove(singleBlog)}>
          Remove
        </Button>
      )}
      <Header as='h3'>comments</Header>
      <Form onSubmit={handleSendComment}>
        <Input type='text' name='comment' />
        <Button type='submit'>add comment</Button>
      </Form>
      <List bulleted>
        {singleBlog.comments.map((comment) => (
          <List.Item key={comment}>{comment}</List.Item>
        ))}
      </List>
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
