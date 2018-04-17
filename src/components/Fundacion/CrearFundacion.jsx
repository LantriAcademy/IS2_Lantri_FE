import React, { Component } from 'react';
import WebApiService from '../Service/WebApiService';
import FileBase64 from '../Helpers/FileBase64';
import '../../styles/CrearFundacion.css';
import { FormErrors } from "../Helpers/FormErrors.js"
import DraggableMap from './DraggableMap';

import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    user : state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
      foundation: (foundationId) => dispatch({
          type: 'FoundationID', foundationId :foundationId
      })
  }
}

class CrearFundacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      direction: "",
      file: "",
      formErrorsName: {name: ''},
      formErrorsDirection: {direction: ''},
      nameValid: false,
      directionValid: false,
      lat: 4.637894,
      lng: -74.084023
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

    var data = {
      'direction': 'foundations',
      'param' : '',
      'body' : {"foundation": {"name": this.state.name, "direction": this.state.direction, "latitude": this.state.lat, "longitude": this.state.lng, "director_id": this.props.user.id}},
    }
    WebApiService.Post(data).then(res =>{
      if (res.status === 201) {
        res.json().then((result) =>{
          this.props.foundation(result.id);
          this.props.history.push("/");
        });
      } else {
        alert("Error al crear intentalo de nuevo");
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

  validateField(fieldName, value) {
    let formErrorsName = this.state.formErrorsName;
    let formErrorsDirection = this.state.formErrorsDirection;
    let fieldValidationErrors = this.state.formErrors;
    let nameValid = this.state.nameValid;
    let directionValid = this.state.directionValid;
  
    switch(fieldName) {
      case 'name':
        nameValid = value.length >= 2;
        formErrorsName.name = nameValid ? '': ' es obligatorio.';
        break;
      case 'direction':
        directionValid = value.length >= 4;
        formErrorsDirection.direction = directionValid ? '': ' no es valida.';
        break;
      default:
        break;
    }
    this.setState({ nameValid: nameValid,
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
            <p><strong>Ubicación: </strong>Arrastre el marcardor a la ubicación deseada.</p>
            <DraggableMap defaultCenter={{lat: this.state.lat, lng: this.state.lng}} onDragEnd={this.onDragEnd}/>
          </div>
          <div className="form-group">
            <label>Imagen</label>
            <FileBase64 onDone={this.getFiles} />
          </div>
          <button type="submit" className="btn btn-success" disabled={!this.state.formValid}>Crear Fundación</button>
        </form>
      </div>
    );
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(CrearFundacion)