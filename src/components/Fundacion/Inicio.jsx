import React, { Component } from 'react';
import Mapa from './Mapa';

export default class Inicio extends Component {
    render() {
      const {fundacion} = this.props;

      return (
        <div>
          <h1 className="text-center">Bienvenido a {fundacion.name}</h1>
          <br></br>
          <div className="panel panel-success">
            <div className="panel-heading">
              <h3 className="panel-title">Descripción</h3>
            </div>
            <div className="panel-body">
              <p>{fundacion.description}</p>
            </div>
          </div>
          <div className="panel panel-success">
            <div className="panel-heading">
              <h3 className="panel-title">Como Ayudarnos</h3>
            </div>
            <div className="panel-body">
              <p>{fundacion.howToHelp}</p>
            </div>
          </div>
          <div className="panel panel-success">
            <div className="panel-heading">
              <h3 className="panel-title">Conctactenos</h3>
            </div>
            <div className="panel-body">
              <p>{fundacion.contactUs}</p>
            </div>
          </div>
        </div>
      );
    }
  }
