import '@testing-library/jest-dom/extend-expect';
import {
  jest, describe, test, beforeEach, expect,
} from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import BlogForm from './BlogForm';

describe('<BlogForm />', () => {
  let blogFormComponent;
  const blog = {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
  };
  const addBlog = jest.fn();

  beforeEach(() => {
    blogFormComponent = render(
      <BlogForm addBlog={addBlog} />,
    );
  });

  test('event handler for adding a blog receives correct parameters', () => {
    const form = blogFormComponent.container.querySelector('form');
    const titleInput = form.querySelector('#title');
    const authorInput = form.querySelector('#author');
    const urlInput = form.querySelector('#url');
    fireEvent.input(titleInput, {
      target: { value: blog.title },
    });
    fireEvent.input(authorInput, {
      target: { value: blog.author },
    });
    fireEvent.input(urlInput, {
      target: { value: blog.url },
    });
    fireEvent.submit(form);
    expect(addBlog).toBeCalledWith(blog);
  });
});
