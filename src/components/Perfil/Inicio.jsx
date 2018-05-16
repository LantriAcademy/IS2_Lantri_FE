import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import WebApiService from '../Service/WebApiService';

export default class Inicio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pdfUrl: "1"
    }
  }

  render() {
    return (
      <div>
          <h1 className="text-center">Bienvenido {this.props.usuario.name} {this.props.usuario.lastname}</h1>
          <br></br>
          <div className="panel panel-success">
            <div className="panel-heading">
              <h3 className="panel-title">Descripción</h3>
            </div>
            <div className="panel-body">
              <p>{this.props.biodes}</p>
            </div>
          </div>
                       <div className="panel panel-success">        
                        <div className="panel-heading">
              <h3 className="panel-title">Telefono</h3>
            </div>
            <div className="panel-body">
              <p>{this.props.usuario.phone}</p>
            </div> </div>
                                   <div className="panel panel-success">        
                        <div className="panel-heading">
              <h3 className="panel-title">Correo Eléctronico</h3>
            </div>
            <div className="panel-body">
              <p>{this.props.usuario.email}</p>
            </div> </div>
            
        </div>
    );
  }
}
