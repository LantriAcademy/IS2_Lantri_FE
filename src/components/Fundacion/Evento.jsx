import React, { Component } from 'react';
import Mapa from './Mapa';
import "../../styles/Evento.css";
import { Button} from "react-bootstrap";
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    user : state.user
  }
}

class Evento extends Component {
  constructor(props){
    super(props)
  }

  render() {
    return (
      <div className="todo">
        <h1 className="text-center">{this.props.event.id}</h1>
        <div className="panel panel-success">
          <div className="panel-heading">
            <h3 className="panel-title">Descripción</h3>
          </div>
          <div className="panel-body">
           <p>{this.props.event.description}</p>
          </div>
        </div>
        <div className="panel panel-success">
          <div className="panel-heading">
            <h3 className="panel-title">Dirección</h3>
          </div>
          <div className="panel-body">
           <p>{this.props.event.direction}</p>
          </div>
        </div>
        <div className="text-center">
          <Mapa defaultCenter={{lat: parseFloat(this.props.event.latitude) , lng: parseFloat(this.props.event.longitude)}}/>
        </div>
        <Button className="btn btn-success btn-block suscribirse">Suscribirse</Button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Evento)