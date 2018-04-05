import React, { Component } from 'react';
import WebApiService from '../Service/WebApiService';
import FileBase64 from '../Helpers/FileBase64';
import '../../styles/CrearFundacion.css';
import DraggableMap from './DraggableMap';

export default class CrearFundacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      direction: "",
      file: "",
      lat: 4.637894,
      lng: -74.084023
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.getFiles = this.getFiles.bind(this);
  }

  handleChange(state, e) {
    this.setState({[state]: e.target.value});
  }

  handleSubmit(event) {
    var data = {
      'direction': 'foundations',
      'param' : '',
      'body' : {"foundation": {"name": this.state.name, "direction": this.state.direction, "latitude": this.state.lat, "longitude": this.state.lng}},
    }
    WebApiService.Post(data).then(res =>{
      if (res.status === 201) {
        alert("Fundacion creada exitosamente")
      } else {
        alert("Error")
      }
    });
    event.preventDefault();
  }

  getFiles(file){
    this.setState({file: file});
  }

  onDragEnd(lat, lng){
    this.setState({lat: lat, lng: lng});
  }

  render() {
    return (
      <div>
        <form className="caja" onSubmit={this.handleSubmit}>
          <h1 className="title">Crear f<b>UN</b>dacion</h1>
          <div className="form-group">
            <label>Nombre</label>
            <input onChange={this.handleChange.bind(this, 'name')} type="text" className="form-control" placeholder="Nombre" required/>
          </div>
          <div className="form-group">
            <label>Dirección</label>
            <input onChange={this.handleChange.bind(this, 'direction')} type="text" className="form-control" placeholder="Dirección"/>
          </div>
          <div className="form-group">
            <p><strong>Ubicación: </strong>Arrastre el marcardor a la ubicación deseada.</p>
            <DraggableMap defaultCenter={{lat: this.state.lat, lng: this.state.lng}} onDragEnd={this.onDragEnd}/>
          </div>
          <div className="form-group">
            <label>Imagen</label>
            <FileBase64 onDone={this.getFiles} />
          </div>
          <button type="submit" className="btn btn-success btn-block">Crear Fundación</button>
        </form>
      </div>
    );
  }

}