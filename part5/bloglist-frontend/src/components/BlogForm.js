/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';

function BlogForm({ addBlog }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreate = async (event) => {
    event.preventDefault();
    await addBlog({ title, author, url });
    setTitle('');
    setAuthor('');
    setUrl('');
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
