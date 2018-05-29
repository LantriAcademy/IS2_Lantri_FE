import React, { Component } from 'react';
import '../../styles/CrearFundacion.css';
import WebApiService from '../Service/WebApiService';
import { FormErrors } from "../Helpers/FormErrors.js"
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
    this.state = {
      name: '',
      direction: '',
      description: '',
      dateTime: '',
      formErrorsName: {name: ''},
      formErrorsDirection: {direction: ''},
      formErrorsDescription: {description: ''},
      formErrorsDateTime: {dateTime: ''},
      nameValid: false,
      directionValid: false,
      descriptionValid: false,
      dateTimeValid: false,
      formValid:false,
      lat: 4.637894,
      lng: -74.084023,
      buttonDisabled: false,
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
    this.setState({buttonDisabled: true});
    var data = {
      'direction': 'events',
      'param' : '',
      'body' : {"event": {"foundation_id": this.props.user.foundationId, "startDate": this.state.dateTime, "name": this.state.name, "direction": this.state.direction, "latitude": this.state.lat, "longitude": this.state.lng, "description": this.state.description}},
      'type' : 1,
      'headers': {'X-Director-Email': this.props.user.email, 'X-Director-Token': this.props.user.token,'Content-Type': 'application/json' }
    }
    WebApiService.Post(data).then(res =>{
      this.setState({buttonDisabled: false});
       res.json().then(result => {
        });
      if (res.status === 201) {
        this.props.history.push("/fundaciones/"+this.props.user.foundationId);
        swal(
          'Exito',
          'Evento creado exitosamente',
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
    event.preventDefault();
  }

  validateField(fieldName, value) {
    var er1 = new RegExp("[></'" + '"]');
    let formErrorsName = this.state.formErrorsName;
    let formErrorsDirection = this.state.formErrorsDirection;
    let formErrorsDateTime = this.state.formErrorsDateTime;
    let formErrorsDescription = this.state.formErrorsDescription;
    let nameValid = this.state.nameValid;
    let directionValid = this.state.directionValid;
    let dateTimeValid = this.state.dateTimeValid;
    let descriptionValid = this.state.descriptionValid;
  
    switch(fieldName) {
      case 'name':
      if (value.match(er1)) {
        nameValid = false;
      } else {
        nameValid = value.length >= 3;
      }
        formErrorsName.name = nameValid ? '': ' es vacío o' + " Contiene un caracter invalido (< > ' " + ' " /)';
        break;
      case 'direction':
      if (value.match(er1)) {
        directionValid = false;
      } else {
        directionValid = value.length >= 4;
      }
        formErrorsDirection.direction = directionValid ? '': ' es vacía o' + " Contiene un caracter invalido (< > ' " + ' " /)';
        break;
      case 'dateTime':
        dateTimeValid = value.length >= 3;
        formErrorsDateTime.dateTime = dateTimeValid ? '': ' es obligatoria.';
        break;
      case 'description':
        if (value.match(er1)) {
          descriptionValid = false;
        } else {
          descriptionValid = value.length >= 2;
        }
        formErrorsDescription.description = descriptionValid ? '' : ' es vacía o' + " Contiene un caracter invalido (< > ' " + ' " /)';
        break;
      default:
        break;
    }
    this.setState({ nameValid: nameValid,
                    directionValid: directionValid,
                    dateTimeValid: dateTimeValid,
                    descriptionValid: descriptionValid,
                  }, this.validateForm);
  }

  validateForm() {
    this.setState({formValid: this.state.nameValid && this.state.directionValid && this.state.dateTimeValid && this.state.descriptionValid});
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
          <FormErrors formErrors={this.state.formErrorsDescription} />
          <div className="form-group">
            <label>Fecha</label>
            <input name = "dateTime" type="datetime-local" className="form-control" 
            value={this.state.dateTime}
            onChange={this.handleUserInput} />
          </div>
          <FormErrors formErrors={this.state.formErrorsDateTime} />
          <div className="form-group">
            <p><strong>Ubicación: </strong>Arrastre el marcardor a la ubicación deseada.</p>
            <DraggableMap defaultCenter={{lat: this.state.lat, lng: this.state.lng}} onDragEnd={this.onDragEnd}/>
          </div>
          <button type="submit" className="btn btn-success" disabled={!this.state.formValid || this.state.buttonDisabled}>Crear Evento</button>
        </form>
      </div>
    );
  }
}
export default connect(mapStateToProps)(CrearEvento)
