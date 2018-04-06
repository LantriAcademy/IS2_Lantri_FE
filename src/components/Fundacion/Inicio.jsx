import React, { Component } from 'react';
import Mapa from './Mapa';

export default class Inicio extends Component {
    render() {
      const {fundacion} = this.props;

      return (
        <div>
          <h1 className="text-center">Bienvenido a {fundacion.name}</h1>
          <p className="text-center"><strong>Dirección: </strong>{fundacion.direction}</p>
          <Mapa defaultCenter={{lat: parseFloat(fundacion.latitude) , lng: parseFloat(fundacion.longitude)}}/>
        </div>
      );
    }
  }
