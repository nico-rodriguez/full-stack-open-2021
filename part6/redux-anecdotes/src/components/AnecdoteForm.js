import { useDispatch } from 'react-redux';
import { addAnecdote } from '../reducers/actionCreators';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const add = (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    console.log('add', content);
    dispatch(addAnecdote(content));
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
