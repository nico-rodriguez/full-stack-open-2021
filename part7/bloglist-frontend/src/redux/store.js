import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notificationSlice';
import userReducer from './userSlice';
import blogsReducer from './blogSlice';

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
    blogs: blogsReducer,
  },
});
