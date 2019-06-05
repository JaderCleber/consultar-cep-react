import React from 'react';
import { Button } from '@material-ui/core';
import { Map, Marker, GoogleApiWrapper } from 'google-maps-react';

interface IMapCard {
  street: string;
  neighborhood: string;
  city: string;
  cep: string;
  onClose(): void;
  google: any;
}

const MapCard: React.FC<IMapCard> = ({ google, street, neighborhood, city, cep, onClose }) => {
  return (
    <div>
      <button onClick={onClose}>X</button>
      <h1>{street}</h1>
      <p id="neighborhood">{neighborhood}</p>
      <p id="city">{city}</p>
      <p id="cep">{cep}</p>
      <Map google={google} zoom={14}>
        <Marker name={'CEP consultado'} />
      </Map>
    </div>
  );
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyCdl6zLIxYxbis_CqbtFl3NjYOmOedy38c',
})(MapCard)
