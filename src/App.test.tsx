import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow } from 'enzyme';

const onClose = () => console.log('close card');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders input by default', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.find('input')).toHaveLength(1)
})

it('valor do input alterado', () => {
  const wrapper = shallow(<App />);
  const input = wrapper.find('input');
  input.props().onChange({
    target: {
      value: '0123'
    }
  });
  console.info(input.props());
  expect(input.props().value).toEqual('0123');
});

it('função que altera o valor do input é chamada', () => {
  const wrapper = shallow(<App />);
  const input = wrapper.find('input');
  input.simulate('change', { target: { value: '0123' } });
  expect(wrapper.props().handleChange).toBeCalled();
});

it('clica o botão de consultar e função handle é chamada', () => {
  const wrapper = shallow(<App />);
  wrapper.find('button').simulate('click');
  expect(wrapper.props().handleClick).toBeCalled();
});


