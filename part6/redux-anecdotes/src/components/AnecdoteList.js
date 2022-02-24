import { useDispatch, useSelector } from 'react-redux';
import { voteAnecdote } from '../redux/reducers/anecdotes';
import { removeNotification, setNotification } from '../redux/reducers/notification';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const filter = state.filter.toLowerCase();
    return [...state.anecdotes]
      .sort(({ votes: v1 }, { votes: v2 }) => v2 - v1)
      .filter(({ content }) => content.toLowerCase().includes(filter));
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));

    const anecdote = anecdotes.find((anecdote) => anecdote.id === id);
    dispatch(setNotification(`You voted for '${anecdote.content}'`));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
