import { configureStore } from '@reduxjs/toolkit';
import notificationReducer from './notificationSlice';
import userReducer from './userSlice';

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    user: userReducer,
  },
});
