import React, { Component } from 'react';
import Mapa from './Mapa';
import "../../styles/Evento.css";
import WebApiService from '../Service/WebApiService';
import { Button} from "react-bootstrap";
import {connect} from 'react-redux';
import swal from 'sweetalert2'

const mapStateToProps = state => {
  return {
    user : state.user
  }
}

class Evento extends Component {
  constructor(props){
    super(props)
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit() {
    console.log("OK")
    console.log(this.props.user.id)
    console.log(this.props.event.id)
    var data = {
      'direction': '/contributor_events',
      'param' : '',
      'body' : { "contributor_event": {"contributor_id": this.props.user.id, "event_id": this.props.event.id}},  
      'type' : 1,
      'headers': {'X-Contributor-Email': this.props.user.email, 'X-Contributor-Token': this.props.user.token,'Content-Type': 'application/json' }
    }
    
    WebApiService.Post(data).then(res =>{
      console.log(res);
       res.json().then(result => {
          console.log(result);
        });
      if (res.status === 201) {
        swal(
          'Exito',
          'Beneficiado creado exitosamente',
          'success'
        )
      } else {
        swal(
          'Error',
          'Asegurese de no haber usado caracteres especiales como ñ o espacios en el nombre',
          'error'
        )
      }
    });
    
  }

  render() {
    return (
      <div className="todo">
        <h1 className="text-center">{this.props.event.name}</h1>
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
            <h3 className="panel-title">Fecha</h3>
          </div>
          <div className="panel-body">
           <p>{this.props.event.startDate}</p>
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
        <Button onClick={this.handleSubmit} className="btn btn-success btn-block suscribirse">Suscribirse</Button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Evento)