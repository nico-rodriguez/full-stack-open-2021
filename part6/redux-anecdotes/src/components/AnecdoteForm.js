import { connect } from 'react-redux';
import { createAnecdote } from '../redux/reducers/anecdotes';

const AnecdoteForm = ({ createAnecdote }) => {
  const add = async (e) => {
    e.preventDefault();
    const content = e.target.content.value;
    createAnecdote(content);
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

const mapDispatchToProps = { createAnecdote };

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm);

export default ConnectedAnecdoteForm;
