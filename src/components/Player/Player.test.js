import React from 'react';
import ReactDOM from 'react-dom';
import Player from './Player';

const CARDS = [
  { title: 'Card #1', value: 10 },
  { title: 'Card #2', value: 20 },
];

const PLAYER = {
  name: 'Player #1',
  score: 10,
  id: 1,
  longestTrain: false
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Player key={PLAYER.id} player={PLAYER} availableCards={CARDS}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
