import { useDispatch } from 'react-redux';
import { addAnecdote } from '../redux/reducers/anecdotes';
import anecdoteService from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const add = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    const anecdote = await anecdoteService.postAnecdote(content);
    dispatch(addAnecdote(anecdote));
    e.target.reset();
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div>
          <input name='content' />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
