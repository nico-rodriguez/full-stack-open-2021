import { useDispatch } from 'react-redux';
import { createAnecdote } from '../redux/reducers/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const add = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    dispatch(createAnecdote(content));
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
