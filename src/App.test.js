import React from 'react';
import ReactDOM from 'react-dom';
import RePrO from './RePrO';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RePrO />, div);
  ReactDOM.unmountComponentAtNode(div);
});
