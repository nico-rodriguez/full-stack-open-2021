/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import blogService from '../services/blogs';

function BlogForm({ addBlog, displayNotification }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      const data = await blogService.create(title, author, url);
      setTitle('');
      setAuthor('');
      setUrl('');
      addBlog(data);
      displayNotification('Blog added successfully!', 'success', 5000);
    } catch (error) {
      displayNotification(error.message, 'error', 5000);
    }
  };

  return (
    <form onSubmit={handleCreate}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" name="title" id="title" value={title} onInput={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <input type="text" name="author" id="author" value={author} onInput={({ target }) => setAuthor(target.value)} />
      </div>
      <div>
        <label htmlFor="url">Url</label>
        <input type="url" name="url" id="url" value={url} onInput={({ target }) => setUrl(target.value)} />
      </div>
      <button type="submit">Create</button>
    </form>
  );
}

export default BlogForm;
