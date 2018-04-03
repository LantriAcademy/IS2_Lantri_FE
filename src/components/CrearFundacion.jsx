import React, { Component } from 'react';
import WebApiService from './Service/WebApiService';
import FileBase64 from './FileBase64';
import '../styles/CrearFundacion.css';
import SimpleMap from './SimpleMap';

export default class CrearFundacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      direction: "",
      file: "",
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
      'body' : {"foundation": {"name": this.state.name, "direction": this.state.direction, "latitude": this.latitude, "longitude": this.longitude}},
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
    this.latitude = lat;
    this.longitude = lng;
  }

  render() {
    return (
      <div>
        <form className="caja" onSubmit={this.handleSubmit}>
          <h1 className="title">Crear f<b>UN</b>dacion</h1>
          <div className="form-group">
            <label>Nombre</label>
            <input onChange={this.handleChange.bind(this, 'name')} type="text" className="form-control" placeholder="Nombre"/>
          </div>
          <div className="form-group">
            <label>Direccion</label>
            <input onChange={this.handleChange.bind(this, 'direction')} type="text" className="form-control" placeholder="Direccion"/>
          </div>
          <div className="form-group">
            <p><strong>Ubicación: </strong>Arrastre el marcardor a la ubicación deseada.</p>
            <SimpleMap defaultCenter={{lat: 4.637894, lng: -74.084023}} onDragEnd={this.onDragEnd}/>
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