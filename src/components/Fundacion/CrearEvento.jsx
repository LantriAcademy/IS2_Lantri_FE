import React, { Component } from 'react';
import '../../styles/CrearFundacion.css';
import WebApiService from '../Service/WebApiService';
import { FormErrors } from "../Helpers/FormErrors.js"
import DraggableMap from './DraggableMap';

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
      name: null,
      direction: null,
      description: null,
      dateTime: null,
      formErrorsName: {name: ''},
      formErrorsDirection: {direction: ''},
      formErrorsDateTime: {dateTime: ''},
      nameValid: false,
      directionValid: false,
      nameValid: false,
      directionValid: false,
      dateTimeValid: false,
      formValid:false,
      lat: 4.637894,
      lng: -74.084023
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
        alert("Evento creado exitosamente")
      } else {
        alert("Error")
      }
    });
    event.preventDefault();
  }

  validateField(fieldName, value) {
    let formErrorsName = this.state.formErrorsName;
    let formErrorsDirection = this.state.formErrorsDirection;
    let formErrorsDateTime = this.state.formErrorsDateTime;
    let nameValid = this.state.nameValid;
    let directionValid = this.state.directionValid;
    let dateTimeValid = this.state.dateTimeValid;
  
    switch(fieldName) {
      case 'name':
        nameValid = value.length >= 3;
        formErrorsName.name = nameValid ? '': ' es obligatorio.';
        break;
      case 'direction':
        directionValid = value.length >= 3;
        formErrorsDirection.direction = directionValid ? '': ' es obligatoria.';
        break;
      case 'dateTime':
        dateTimeValid = value.length >= 3;
        formErrorsDateTime.dateTime = dateTimeValid ? '': ' es obligatoria.';
        break;
      default:
        break;
    }
    this.setState({ nameValid: nameValid,
                    directionValid: directionValid,
                    dateTimeValid: dateTimeValid,
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.nameValid && this.state.directionValid && this.state.dateTimeValid});
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
            <input type="text" className="form-control" name = "name"
            placeholder="Nombre" 
            value = {this.state.name}
            onChange={this.handleUserInput}/>
          </div>
          <FormErrors formErrors={this.state.formErrorsName} />
          <div className="form-group">
            <label>Dirección</label>
            <input  type="text" className="form-control" name = "direction"
            placeholder="Dirección"
            value = {this.state.direction}
            onChange={this.handleUserInput}/>
          </div>
          <FormErrors formErrors={this.state.formErrorsDirection} />
          <div className="form-group">
            <label>Descripción</label>
            <textarea name= "description" type="text" className="form-control" placeholder="Descripción"
            value={this.state.description}
            onChange={this.handleUserInput} />
          </div>
          <div className="form-group">
            <label>Fecha</label>
            <input name = "dateTime" type="datetime-local" className="form-control" 
            value={this.state.description}
            onChange={this.handleUserInput} />
          </div>
          <FormErrors formErrors={this.state.formErrorsDateTime} />
          <div className="form-group">
            <p><strong>Ubicación: </strong>Arrastre el marcardor a la ubicación deseada.</p>
            <DraggableMap defaultCenter={{lat: this.state.lat, lng: this.state.lng}} onDragEnd={this.onDragEnd}/>
          </div>
          <button type="submit" className="btn btn-success" disabled={!this.state.formValid}>Crear Evento</button>
        </form>
      </div>
    );
  }
}
export default connect(mapStateToProps)(CrearEvento)
