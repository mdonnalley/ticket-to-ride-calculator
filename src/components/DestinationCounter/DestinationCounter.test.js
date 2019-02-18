import React from 'react';
import ReactDOM from 'react-dom';
import DestinationCounter from './DestinationCounter';

const TEST_CARD = {
  title: 'Test Card',
  value: 10
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DestinationCounter key={TEST_CARD.title} card={TEST_CARD}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
