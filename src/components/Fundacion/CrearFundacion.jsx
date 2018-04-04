import React, { Component } from 'react';
import WebApiService from '../Service/WebApiService';
import FileBase64 from '../Helpers/FileBase64';
import '../../styles/CrearFundacion.css';

export default class CrearFundacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      direction: '',
      latitude: '',
      longitude: '',
      file: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getFiles = this.getFiles.bind(this);
  }

  handleChange(state, e) {
    this.setState({[state]: e.target.value});
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.state.name);
    // alert('A direction was submitted: ' + this.state.direction);
    // alert('A image was submitted: ' + this.state.file.base64);

    /*
    var data = {
      'direction': 'foundations',
      'param' : '',
      'body' : {"foundation": {"name": this.state.name, "direction": this.state.direction, "latitude": this.state.latitude, "longitude": this.state.longitude}},
    }
    WebApiService.Post(data).then(res =>{
      if (res.status == "201") {
        alert("Fundacion creada exitosamente")
      }
    });
    */
    event.preventDefault();
  }

  getFiles(file){
    this.setState({ file: file });
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
            <label>Imagen</label>
            <FileBase64 onDone={this.getFiles.bind(this)} />
          </div>
          <button type="submit" className="btn btn-success">Crear</button>
        </form>
      </div>
    );
  }
}
