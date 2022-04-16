import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: null,
  type: null,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    set: (state, action) => ({
      message: action.payload.message ?? state.message,
      type: action.payload.type ?? state.type,
    }),
    clear: () => ({ message: null, type: null }),
  },
});

export const { set, clear } = notificationSlice.actions;

export default notificationSlice.reducer;
