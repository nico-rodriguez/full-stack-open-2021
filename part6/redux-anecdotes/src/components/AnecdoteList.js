import { useDispatch, useSelector } from 'react-redux';
import { voteNote } from '../reducers/actionCreators';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.sort(({ votes: v1 }, { votes: v2 }) => v2 - v1)
  );
  const dispatch = useDispatch();

  const vote = (id) => {
    console.log('vote', id);
    dispatch(voteNote(id));
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
