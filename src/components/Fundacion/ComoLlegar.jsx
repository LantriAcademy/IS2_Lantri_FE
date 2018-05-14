import React, { Component } from 'react';
import Mapa from './Mapa';

export default class ComoLlegar extends Component {
    render() {
      const {fundacion} = this.props;

      return (
        <div>
          <div className="panel panel-success">
            <div className="panel-heading">
              <h3 className="panel-title">Dirección</h3>
            </div>
            <div className="panel-body">
              <p>{fundacion.direction}</p>
            </div>
          </div>
          <div className="panel panel-success">
            <div className="panel-heading">
              <h3 className="panel-title">Mapa</h3>
            </div>
            <div className="panel-body">
              <Mapa defaultCenter={{lat: parseFloat(fundacion.latitude) , lng: parseFloat(fundacion.longitude)}}/>
            </div>
          </div>

        </div>
      );
    }
  }
