import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  type: null,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => ({
      message: action.payload.message ?? state.message,
      type: action.payload.type ?? state.type,
    }),
    clearNotification: () => ({ message: null, type: null }),
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
