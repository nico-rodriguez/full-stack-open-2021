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
  },
});

export const { setBlogs, addBlog, updateBlog, removeBlog } = blogSlice.actions;

export default blogSlice.reducer;
