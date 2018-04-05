import React, { Component } from 'react';
import WebApiService from '../Service/WebApiService';
import FileBase64 from '../Helpers/FileBase64';
import '../../styles/CrearFundacion.css';
import SimpleMap from './SimpleMap';
import { FormErrors } from "../Helpers/FormErrors.js"

export default class CrearFundacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      direction: "",
      file: "",
      formErrors: {name: "", direction: ""},
      nameValid: false,
      directionValid: false,
      formValid: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.getFiles = this.getFiles.bind(this);
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }


  handleSubmit(event) {
    //console.log(this.state.name)
    //console.log(this.state.direction)

    if (!(this.latitude && this.longitude)) {this.latitude = 4.637894; this.longitude = -74.084023;}
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

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let directionValid = this.state.directionValid;
  
    switch(fieldName) {
      case 'name':
        nameValid = value.length >= 1;
        fieldValidationErrors.name = nameValid ? '': ' es obligatorio.';
        break;
      case 'direction':
        directionValid = value.length >= 1;
        fieldValidationErrors.direction = directionValid ? '': ' es obligatoria.';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    nameValid: nameValid,
                    directionValid: directionValid,
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.nameValid && this.state.directionValid});
  }  

  render() {
    return (
      <div>
        <form className="caja" onSubmit={this.handleSubmit}>
          <h1 className="title">Crear f<b>UN</b>dacion</h1>
          <div className="form-group">
            <label>Nombre</label>
            <input type="text" className="form-control" name = "name"
            placeholder="Nombre" 
            value = {this.state.name}
            onChange={this.handleUserInput}/>
          </div>
          <div className="form-group">
            <label>Dirección</label>
            <input  type="text" className="form-control" name = "direction"
            placeholder="Dirección"
            value = {this.state.direction}
            onChange={this.handleUserInput}/>
          </div>
          <div className="form-group">
            <p><strong>Ubicación: </strong>Arrastre el marcardor a la ubicación deseada.</p>
            <SimpleMap defaultCenter={{lat: 4.637894, lng: -74.084023}} onDragEnd={this.onDragEnd}/>
          </div>
          <div className="form-group">
            <label>Imagen</label>
            <FileBase64 onDone={this.getFiles} />
          </div>
          <div>
              <br/>
              <FormErrors formErrors={this.state.formErrors} />
          </div> 
          <button type="submit" className="btn btn-success" disabled={!this.state.formValid}>Crear Fundación</button>
        </form>
      </div>
    );
  }

}