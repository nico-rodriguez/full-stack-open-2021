import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

const App = () => {
  const dispatchGood = () => {
    store.dispatch({
      type: 'GOOD',
    });
  };

  const dispatchOk = () => {
    store.dispatch({
      type: 'OK',
    })
  };

  const dispatchBad = () => {
    store.dispatch({
      type: 'BAD',
    })
  };

  const dispatchReset = () => {
    store.dispatch({
      type: 'ZERO',
    })
  };

  const { good, ok, bad } = store.getState();

  return (
    <div>
      <button onClick={dispatchGood}>good</button>
      <button onClick={dispatchOk}>ok</button>
      <button onClick={dispatchBad}>bad</button>
      <button onClick={dispatchReset}>reset stats</button>
      <div>good {good}</div>
      <div>ok {ok}</div>
      <div>bad {bad}</div>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);
