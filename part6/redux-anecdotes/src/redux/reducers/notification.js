import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return '';
    },
  },
});

export const { createNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (text, seconds) => {
  return async (dispatch) => {
    dispatch(createNotification(text));
    setTimeout(() => {
      dispatch(removeNotification());
    }, seconds * 1000);
  };
};

export default notificationSlice.reducer;
