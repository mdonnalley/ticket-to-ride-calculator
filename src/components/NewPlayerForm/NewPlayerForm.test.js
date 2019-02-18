import React from 'react';
import ReactDOM from 'react-dom';
import NewPlayerForm from './NewPlayerForm';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<NewPlayerForm />, div);
  ReactDOM.unmountComponentAtNode(div);
});
