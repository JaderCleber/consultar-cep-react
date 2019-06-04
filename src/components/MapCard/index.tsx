import React from 'react';
import { Button } from '@material-ui/core';

interface IMapCard {
  street: string;
  neighborhood: string;
  city: string;
  cep: string;
  onClose(): void;
}

const MapCard: React.FC<IMapCard> = ({ street, neighborhood, city, cep, onClose }) => {
  return (
    <div>
      <button onClick={onClose}>X</button>
      <h1>{street}</h1>
      <p id="neighborhood">{neighborhood}</p>
      <p id="city">{city}</p>
      <p id="cep">{cep}</p>
    </div>
  );
}

export default MapCard;
