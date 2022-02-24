import { configureStore } from '@reduxjs/toolkit';
import anecdotesReducer from './reducers/anecdotes';
import notificationReducer from './reducers/notification';
import filterReducer from './reducers/filter';


const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer,
    notification: notificationReducer
  }
});

export default store;