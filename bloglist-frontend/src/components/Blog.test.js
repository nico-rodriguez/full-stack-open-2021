import '@testing-library/jest-dom/extend-expect';
import { jest, describe, test, beforeEach, expect } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
    let blogComponent;
    const blog = {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
    };
    const updateBlog = jest.fn();
    const removeBlog = jest.fn();

    beforeEach(() => {
      blogComponent = render(
        <Blog blog={blog} updateBlog={updateBlog} removeBlog={removeBlog} />
      );
    })
  

  test('display title by default', () => {
     expect(blogComponent.container).toHaveTextContent(blog.title);
  });

  test('hide author, url and likes by default', () => {
    const hiddenEl = blogComponent.container.querySelector('div').querySelector('div');
    expect(hiddenEl).toHaveStyle('display: none');
    expect(hiddenEl).toHaveTextContent(blog.author);
    expect(hiddenEl).toHaveTextContent(blog.url);
    expect(hiddenEl).toHaveTextContent(blog.likes);
  });

  test('show hidden text when clicking', () => {
    const viewBtn = blogComponent.getByText('view');
    fireEvent.click(viewBtn);
    const hiddenEl = blogComponent.container.querySelector('div').querySelector('div');
    expect(hiddenEl).not.toHaveStyle('display: none');
    expect(hiddenEl).toHaveTextContent(blog.author);
    expect(hiddenEl).toHaveTextContent(blog.url);
    expect(hiddenEl).toHaveTextContent(blog.likes);
  });
});
