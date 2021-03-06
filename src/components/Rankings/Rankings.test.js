import React from 'react';
import ReactDOM from 'react-dom';
import Rankings from './Rankings';

const PLAYERS = [
  { name: 'Player #1', score: 10, id: 1, longestTrain: false },
  { name: 'Player #2', score: 20, id: 2, longestTrain: true },
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Rankings players={PLAYERS}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
