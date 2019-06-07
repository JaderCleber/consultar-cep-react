import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { mount, shallow } from 'enzyme';

beforeEach(() => {
  const script = document.createElement('script');
  script.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(script);
})

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App classes={{}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders input by default', async () => {
  const wrapper = mount(<App classes={{}} />);
  expect(wrapper.find('input#cep-search')).toHaveLength(1)
  wrapper.unmount();
})
// it('função que altera o valor do input é chamada', async () => {
//   const wrapper = mount(<App classes={{}} />);
//   // await wrapper.instance().componentDidMount();
//   const input = wrapper.find('input#cep-search');
//   input.simulate('change', { target: { value: '0123' } });
//   expect(wrapper.props().handleChange).toBeCalled();
//   wrapper.unmount();
// });

// it('clica o botão de consultar e função handle é chamada', async () => {
//   const wrapper = mount(<App classes={{}} />);
//   // await wrapper.instance().componentDidMount();
//   wrapper.find('button#btn-search').simulate('click');
//   expect(wrapper.props().handleClick).toBeCalled();
//   wrapper.unmount();
// });


