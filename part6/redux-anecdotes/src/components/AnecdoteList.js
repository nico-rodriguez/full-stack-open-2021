import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../redux/reducers/anecdotes';
import { setNotification } from '../redux/reducers/notification';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const filter = state.filter.toLowerCase();
    return [...state.anecdotes]
      .sort(({ votes: v1 }, { votes: v2 }) => v2 - v1)
      .filter(({ content }) => content.toLowerCase().includes(filter));
  });
  const dispatch = useDispatch();

  const vote = (id, votes) => {
    dispatch(voteAnecdote(id, votes));

    const anecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 5));
  };

  return (
    <>
      {anecdotes.map(({ id, content, votes }) => (
        <div key={id}>
          <div>{content}</div>
          <div>
            has {votes}
            <button onClick={() => vote(id, votes)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
