import { ADD_ANECDOTE, VOTE_ANECDOTE } from "./actionTypes"

export const voteNote = (id) => ({
  type: VOTE_ANECDOTE,
  payload: id
});

export const addAnecdote = (content) => ({
  type: ADD_ANECDOTE,
  payload: content
})
