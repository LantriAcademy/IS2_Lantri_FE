import React, { Component } from 'react';
import '../../styles/CrearFundacion.css';
import WebApiService from '../Service/WebApiService';
import SimpleMap from './SimpleMap';
import { FormErrors } from "../Helpers/FormErrors.js"

export default class CrearEvento extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      direction: "",
      description: "",
      dateTime: "",
      formErrors: {name: "", direction: "", description: '', dateTime: ''},
      nameValid: false,
      directionValid: false,
      descriptionValid: false,
      dateTimeValid: false,
      formValid: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
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
    //console.log(this.state.description)
    //console.log(this.state.dateTime)
    
    if (!(this.latitude && this.longitude)) {this.latitude = 4.637894; this.longitude = -74.084023;}
    /*POST*/
    event.preventDefault();
  }

  onDragEnd(lat, lng){
    this.latitude = lat;
    this.longitude = lng;
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let directionValid = this.state.directionValid;
    let descriptionValid = this.state.descriptionValid;
    let dateTimeValid = this.state.dateTimeValid;
  
    switch(fieldName) {
      case 'name':
        nameValid = value.length >= 1;
        fieldValidationErrors.name = nameValid ? '': ' es obligatorio.';
        break;
      case 'direction':
        directionValid = value.length >= 1;
        fieldValidationErrors.direction = directionValid ? '': ' es obligatoria.';
        break;
      case 'description':
        descriptionValid = value.length >= 1;
        fieldValidationErrors.description = descriptionValid ? '': ' es obligatoria.';
        break;
      case 'dateTime':
        dateTimeValid = value.length >= 1;
        fieldValidationErrors.dateTime = dateTimeValid ? '': ' es obligatoria.';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    nameValid: nameValid,
                    directionValid: directionValid,
                    descriptionValid: descriptionValid,
                    dateTimeValid: dateTimeValid
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.nameValid && this.state.directionValid && this.state.descriptionValid && 
                    this.state.dateTimeValid});
  }  

  render() {
    return (
      <div>
        <form className="caja" onSubmit={this.handleSubmit}>
          <h1 className="title">Crear Evento</h1>
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
            <label>Descripción</label>
            <textarea type="text" className="form-control" name = "description"
            placeholder="Descripción"
            value = {this.state.description}
            onChange={this.handleUserInput}/>
          </div>
          <div className="form-group">
            <label>Fecha</label>
            <input type="datetime-local" className="form-control" name = "dateTime"
            value = {this.state.dateTime}
            onChange={this.handleUserInput}/>
          </div>
          <div className="form-group">
            <p><strong>Ubicación: </strong>Arrastre el marcardor a la ubicación deseada.</p>
            <SimpleMap defaultCenter={{lat: 4.637894, lng: -74.084023}} onDragEnd={this.onDragEnd}/>
          </div>
          <div>
              <br/>
              <FormErrors formErrors={this.state.formErrors} />
          </div> 
          <button type="submit" className="btn btn-success" disabled={!this.state.formValid}>Crear Evento</button>
        </form>
      </div>
    );
  }
}
