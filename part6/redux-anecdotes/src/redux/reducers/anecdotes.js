import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../../services/anecdotes';

const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    updateAnecdote(state, action) {
      const { anecdoteId: oldAnecdoteId, anecdote: updatedAnecdote } =
        action.payload;
      const newState = state.map((anecdote) =>
        anecdote.id === oldAnecdoteId ? updatedAnecdote : anecdote
      );
      return newState;
    },
    addAnecdote(state, action) {
      const anecdote = action.payload;
      return [...state, anecdote];
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { updateAnecdote, addAnecdote, setAnecdotes } =
  anecdotesSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.postAnecdote(content);
    dispatch(addAnecdote(anecdote));
  };
};

export const voteAnecdote = (anecdoteId, votes) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.voteAnecdote(anecdoteId, votes + 1);
    dispatch(updateAnecdote({ anecdoteId, anecdote }));
  };
};

export default anecdotesSlice.reducer;
