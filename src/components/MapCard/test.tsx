import React from 'react';
import ReactDOM from 'react-dom';
import MapCard from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapCard />, div);
  ReactDOM.unmountComponentAtNode(div);
});

