import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    text: '',
    timeout: null,
  },
  reducers: {
    createNotification(state, action) {
      // Clear the timeout for the previous notification
      state.timeout && clearTimeout(state.timeout);

      return {
        text: action.payload.text,
        timeout: action.payload.timeout,
      };
    },
    removeNotification(state, action) {
      return {
        text: '',
        timeout: null,
      };
    },
  },
});

export const { createNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (text, seconds) => {
  return async (dispatch) => {
    const timeout = setTimeout(() => {
      dispatch(removeNotification());
    }, seconds * 1000);
    dispatch(createNotification({ text, timeout }));
  };
};

export default notificationSlice.reducer;
