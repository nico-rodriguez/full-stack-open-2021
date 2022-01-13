import { useState } from "react";
import blogService from "../services/blogs";

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleCreate = async (event) => {
    event.preventDefault();
    const data = await blogService.create(title, author, url);
    setTitle('');
    setAuthor('');
    setUrl('');
    addBlog(data);
  }

  return <form onSubmit={handleCreate}>
    <div>
      <label>Title</label>
      <input type="text" name="title" id="title" value={title} onInput={({ target }) => setTitle(target.value)}></input>
    </div>
    <div>
      <label>Author</label>
      <input type="text" name="author" id="author" value={author} onInput={({ target }) => setAuthor(target.value)}></input>
    </div>
    <div>
      <label>Url</label>
      <input type="url" name="url" id="url" value={url} onInput={({ target }) => setUrl(target.value)}></input>
    </div>
    <button type="submit">Create</button>
  </form>
};

export default BlogForm;