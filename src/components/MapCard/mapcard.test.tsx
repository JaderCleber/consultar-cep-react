import React from 'react';
import ReactDOM from 'react-dom';
import MapCard from './index';
import { shallow } from 'enzyme';

const onClose = () => console.log('close card');

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapCard street='Rua' neighborhood='Bairro' city='Cidade' cep='0123' onClose={onClose}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renderiza a rua corretamente', () => {
  const wrapper = shallow(<MapCard street='Rua' neighborhood='Bairro' city='Cidade' cep='0123' onClose={onClose}/>);
  expect(wrapper.find('h1').text()).toBe('Rua');
});

it('renderiza o bairro corretamente', () => {
  const wrapper = shallow(<MapCard street='Rua' neighborhood='Bairro' city='Cidade' cep='0123' onClose={onClose}/>);
  expect(wrapper.find('#neighborhood').text()).toBe('Bairro');
});

it('renderiza a cidade corretamente', () => {
  const wrapper = shallow(<MapCard street='Rua' neighborhood='Bairro' city='Cidade' cep='0123' onClose={onClose}/>);
  expect(wrapper.find('#city').text()).toBe('Cidade');
});

it('renderiza o cep corretamente', () => {
  const wrapper = shallow(<MapCard street='Rua' neighborhood='Bairro' city='Cidade' cep='0123' onClose={onClose}/>);
  expect(wrapper.find('#cep').text()).toBe('0123');
});

it('fecha o cartão do mapa', () => {
  const wrapper = shallow(<MapCard street='Rua' neighborhood='Bairro' city='Cidade' cep='0123' onClose={onClose}/>);
  wrapper.find('button').simulate('click');
});

