import React, { useState } from 'react';
import MapCard from './components/MapCard';

class App extends React.PureComponent {
  state = {
    cep: '',
    found: null,
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => this.setState({ cep: e.target.value });
  handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.setState({ found: false }, () => {
      // FETCH GOOGLE API
      fetch(`http://maps.google.com/maps/api/geocode/json?address=${this.state.cep}&sensor=false`, () => {

      })
    });
  };

  render() {
    const { cep, found } = this.state;
    return (
      <div className="App">
        <h3>Consultar</h3>
        <h3>CPE</h3>
        <input value={cep} onChange={this.handleChange} />
        <button onClick={this.handleClick} />

        {found && (
          <MapCard cep={cep} />
        )}
      </div>
    );
  }
}

export default App;
