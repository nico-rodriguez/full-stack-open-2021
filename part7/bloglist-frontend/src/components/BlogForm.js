/* eslint-disable object-curly-newline */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { Button, Form, Input, Label } from 'semantic-ui-react';

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
    <Form onSubmit={handleCreate}>
      <Form.Field>
        <Label htmlFor='title'>Title</Label>
        <Input
          type='text'
          name='title'
          id='title'
          value={title}
          onInput={({ target }) => setTitle(target.value)}
        />
      </Form.Field>
      <Form.Field>
        <Label htmlFor='author'>Author</Label>
        <Input
          type='text'
          name='author'
          id='author'
          value={author}
          onInput={({ target }) => setAuthor(target.value)}
        />
      </Form.Field>
      <Form.Field>
        <Label htmlFor='url'>Url</Label>
        <Input
          type='url'
          name='url'
          id='url'
          value={url}
          onInput={({ target }) => setUrl(target.value)}
        />
      </Form.Field>
      <Button type='submit'>Create</Button>
    </Form>
  );
}

export default BlogForm;
