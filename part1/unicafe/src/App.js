import { useState } from 'react';


const Header = () => <h1>give feedback</h1>;

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td> {value}</td></tr>;

const Statistics = ({ stats }) => {
  if (stats.good + stats.neutral + stats.bad === 0) {
    return (
      <>
        <h2>statistics</h2>
        <p>No feedback given</p>
      </>
    );
  }

  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          {Object.entries(stats)
            .map(([text, value]) => <StatisticLine text={text} value={value} key={text}/>)}
        </tbody>
      </table>
    </>
  );
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Header />
      <Button onClick={() => setGood(good + 1)} text="good"/>
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral"/>
      <Button onClick={() => setBad(bad + 1)} text="bad"/>
      <Statistics stats={{
        good: good,
        neutral: neutral,
        bad: bad,
        average: (1*good + 0*neutral + (-1)*bad) / (good + neutral + bad).toFixed(1),
        positive: ((good / (good + neutral + bad)) * 100).toFixed(1) + '%'
      }}/>
    </div>
  );
}

export default App;
