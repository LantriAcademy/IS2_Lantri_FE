import React, { Component } from 'react';
import '../../styles/CrearFundacion.css';
import WebApiService from '../Service/WebApiService';
import SimpleMap from './SimpleMap';

export default class CrearEvento extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      direction: "",
      description: "",
      dateTime: "",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  handleChange(state, e) {
    this.setState({[state]: e.target.value});
  }

  handleSubmit(event) {
    if (!(this.latitude && this.longitude)) {this.latitude = 4.637894; this.longitude = -74.084023;}
    /*POST*/
    event.preventDefault();
  }

  onDragEnd(lat, lng){
    this.latitude = lat;
    this.longitude = lng;
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
            <SimpleMap defaultCenter={{lat: 4.637894, lng: -74.084023}} onDragEnd={this.onDragEnd}/>
          </div>
          <button type="submit" className="btn btn-success btn-block">Crear Evento</button>
        </form>
      </div>
    );
  }
}
