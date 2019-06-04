import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import MapCard from './components/MapCard';
import { shallow } from 'enzyme';

const onClose = () => console.log('close card');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
