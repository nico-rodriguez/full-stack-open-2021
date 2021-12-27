import { useState } from 'react';


const Anecdote = ({ anecdote }) => <>
  <h1>Anecdote of the day</h1>
  <p>{anecdote}</p>
</>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Votes = ({ votes }) => <p>has {votes} votes</p>

const MostVoted = ({ anecdote }) => <>
  <h2>Anecdote with most votes</h2>
  <p>{anecdote}</p>
</>;


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(anecdotes.map(() => 0));

  const handleVote = () => {
    const newVotes = votes.slice();
    newVotes[selected] += 1;
    setVotes(newVotes);
  }

  const mostVoted = (anecdotes, votes) => {
    const sortedEntries = [...votes.entries()].sort(([_a, a], [_b, b]) => b - a);
    debugger;
    const indexOfMax = sortedEntries[0][0];

    return anecdotes[indexOfMax];
  }

  return (
    <div>
      <Anecdote anecdote={anecdotes[selected]}/>
      <Votes votes={votes[selected]}/>
      <Button onClick={handleVote} text="vote"/>
      <Button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="next anecdote"/>
      <MostVoted anecdote={mostVoted(anecdotes, votes)}/>
    </div>
  )
}

export default App;
