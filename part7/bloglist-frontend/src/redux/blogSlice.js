/* eslint-disable no-confusing-arrow */
/* eslint-disable object-curly-newline */
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs: (state, action) => action.payload,
    addBlog: (state, action) => state.concat(action.payload),
    updateBlog: (state, action) => {
      const updatedBlog = action.payload;
      const blogId = updatedBlog.id;
      return state.map((blog) => (blog.id === blogId ? updatedBlog : blog));
    },
    removeBlog: (state, action) =>
      // eslint-disable-next-line implicit-arrow-linebreak
      state.filter(({ id }) => id !== action.payload),
    addComment: (state, action) => {
      const blogId = action.payload.id;
      const { comment } = action.payload;
      return state.map(
        (blog) =>
          // eslint-disable-next-line implicit-arrow-linebreak
          blog.id === blogId
            ? { ...blog, comments: blog.comments.concat(comment) }
            : blog
        // eslint-disable-next-line function-paren-newline
      );
    },
  },
});

// eslint-disable-next-line operator-linebreak
export const { setBlogs, addBlog, updateBlog, removeBlog, addComment } =
  blogSlice.actions;

export default blogSlice.reducer;
