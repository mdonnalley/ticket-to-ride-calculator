import React from 'react';
import ReactDOM from 'react-dom';
import TrainCounter from './TrainCounter';

const TRAIN_LENGTHS = [
  { key: 'oneCount', label: 'One Trains', multiplier: 1 },
  { key: 'twoCount', label: 'Two Trains', multiplier: 2 },
  { key: 'threeCount', label: 'Three Trains', multiplier: 4 },
  { key: 'fourCount', label: 'Four Trains', multiplier: 7 },
  { key: 'fiveCount', label: 'Five Trains', multiplier: 10 },
  { key: 'sixCount', label: 'Six Trains', multiplier: 15 }
];

const TRAIN_LENGTH = TRAIN_LENGTHS[0];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <TrainCounter
      key={TRAIN_LENGTH.key}
      trainLengthKey={TRAIN_LENGTH.key}
      label={TRAIN_LENGTH.label}
      value={0} />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
