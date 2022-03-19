import axios from 'axios';

const baseUrl = 'http://localhost:3001/anecdotes';

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const postAnecdote = async (content) => {
  const { data } = await axios.post(baseUrl, { content, votes: 0 });
  return data;
};

const voteAnecdote = async (anecdoteId, votes) => {
  const { data } = await axios.patch(baseUrl + `/${anecdoteId}`, { votes });
  return data;
};

export default { getAll, postAnecdote, voteAnecdote };
