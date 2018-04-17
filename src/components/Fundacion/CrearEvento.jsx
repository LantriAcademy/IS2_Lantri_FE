import React, { Component } from 'react';
import '../../styles/CrearFundacion.css';
import WebApiService from '../Service/WebApiService';
import DraggableMap from './DraggableMap';
import swal from 'sweetalert2'
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    user : state.user
  }
}

class CrearEvento extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.user);
    this.state = {
      name: "",
      direction: "",
      description: "",
      dateTime: "",
      lat: 4.637894,
      lng: -74.084023
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  handleChange(state, e) {
    this.setState({[state]: e.target.value});
  }

  handleSubmit(event) {
    var data = {
      'direction': 'events',
      'param' : '',
      'body' : {"event": {"foundation_id": this.props.user.foundationId, "startDate": this.state.dateTime, "name": this.state.name, "direction": this.state.direction, "latitude": this.state.lat, "longitude": this.state.lng, "description": this.state.description}},
      'type' : 1,
      'headers': {'X-Director-Email': this.props.user.email, 'X-Director-Token': this.props.user.token,'Content-Type': 'application/json' }
    }
    WebApiService.Post(data).then(res =>{
      console.log(res);
       res.json().then(result => {
          console.log(result);
        });
      if (res.status === 201) {
        //alert("Evento creado exitosamente")
        swal(
          'Exito',
          'Evento creado exitosamente',
          'success'
        )
      } else {
        //alert("Error")
        swal(
          'Error',
          'Asegurese de no haber usado caracteres especiales como ñ o espacios en el nombre',
          'error'
        )
      }
    });
    event.preventDefault();
  }

  onDragEnd(lat, lng){
    this.setState({lat: lat, lng: lng});
  }

  render() {
    return (
      <div>
        <form className="caja" onSubmit={this.handleSubmit}>
          <h1 className="title">Crear Evento</h1>
          <div className="form-group">
            <label>Nombre</label>
            <input onChange={this.handleChange.bind(this, 'name')} type="text" className="form-control" placeholder="Nombre" required/>
          </div>
          <div className="form-group">
            <label>Dirección</label>
            <input onChange={this.handleChange.bind(this, 'direction')} type="text" className="form-control" placeholder="Dirección"/>
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <textarea onChange={this.handleChange.bind(this, 'description')} type="text" className="form-control" placeholder="Descripción"/>
          </div>
          <div className="form-group">
            <label>Fecha</label>
            <input onChange={this.handleChange.bind(this, 'dateTime')} type="datetime-local" className="form-control" required/>
          </div>
          <div className="form-group">
            <p><strong>Ubicación: </strong>Arrastre el marcardor a la ubicación deseada.</p>
            <DraggableMap defaultCenter={{lat: this.state.lat, lng: this.state.lng}} onDragEnd={this.onDragEnd}/>
          </div>
          <button type="submit" className="btn btn-success btn-block">Crear Evento</button>
        </form>
      </div>
    );
  }
}
export default connect(mapStateToProps)(CrearEvento)
