import React from 'react';
import ReactDOM from 'react-dom';
import DestinationSelector from './DestinationSelector';

const OPTIONS = [
  { title: 'Card #1', value: 10 },
  { title: 'Card #2', value: 20 },
];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DestinationSelector options={OPTIONS} card={OPTIONS[0]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
