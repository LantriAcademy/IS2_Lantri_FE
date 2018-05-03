import React, { Component } from 'react';
import FileBase64 from '../Helpers/FileBase64';
import '../../styles/CrearFundacion.css';
import WebApiService from '../Service/WebApiService';
import swal from 'sweetalert2'
import{FormControl} from "react-bootstrap"
import {connect} from 'react-redux';
import { FormErrors } from "../Helpers/FormErrors.js"

const mapStateToProps = state => {
  return {
    user : state.user
  }
}

class CrearBeneficiado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      preferences: "",
      file: "",
      formErrorsName: {name: ''},
      formErrorsAge: {age: ''},
      nameValid: false,
      ageValid: false,
      formValid: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getFiles = this.getFiles.bind(this);
    
  }

  handleTagChange(tags) {
    this.setState({tags})
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }
  validateField(fieldName, value) {
    let formErrorsName = this.state.formErrorsName;
    let formErrorsAge = this.state.formErrorsAge;
    let nameValid = this.state.nameValid;
    let ageValid = this.state.ageValid;

  
    switch(fieldName) {
      case 'name':
        nameValid = value.length >= 1;
        formErrorsName.name = nameValid ? '': ' es obligatorio';
        break;
      case 'age':
      ageValid = value.length >= 1;
        formErrorsAge.age = ageValid ? '': ' es obligatoria';
        break;
      default:
        break;
    }
    this.setState({ nameValid: nameValid,
                    ageValid: ageValid,
                  }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: this.state.nameValid && this.state.ageValid});
  } 

  getFiles(file){
    this.setState({file: file});
  }

  handleSubmit(event) {
    var data = {
      'direction': 'benefiteds',
      'param' : '',
      'body' : {"benefited": {"foundation_id": this.props.user.foundationId, "name": this.state.name, "age": this.state.age, "preferences": this.state.preferences, "avatar": this.state.file.base64}},
      'type' : 1,
      'headers': {'X-Director-Email': this.props.user.email, 'X-Director-Token': this.props.user.token,'Content-Type': 'application/json' }
    }
    WebApiService.Post(data).then(res =>{
      //console.log(res);
       res.json().then(result => {
          //console.log(result);
        });
      if (res.status === 201) {
        this.props.history.push("/fundaciones/"+this.props.user.foundationId);
        swal(
          'Exito',
          'Beneficiado creado exitosamente',
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

  render() {
    const preview = (this.state.file !== "" ? <img src={this.state.file.base64} height="180" width="210" alt="preview"/> : "");
    return (
      <div>
        <form className="caja" onSubmit={this.handleSubmit}>
          <h1 className="title">Crear Beneficiado</h1>
          <div className="form-group">
            <label>Nombre</label>
              <input type="name" className="form-control" name="name" 
                    placeholder="Nombre"
                    value={this.state.name}
                    onChange={this.handleUserInput} />
          </div>
          <div>
                <FormErrors formErrors={this.state.formErrorsName} />
          </div> 
          <div className="form-group">
            <label>Edad</label>
            <input type="number" className="form-control" name="age" 
                    placeholder="Edad"
                    value={this.state.age}
                    onChange={this.handleUserInput} />
          </div>
          <div>
              <FormErrors formErrors={this.state.formErrorsAge} />
          </div> 
          <div className="form-group">
            <label>Preferencias</label>
            <FormControl componentClass="textarea" name= "preferences" placeholder="Preferencias"
                    value={this.state.preferences}
                    onChange={this.handleUserInput} />
          </div>
          <div className="form-group">
            <label>Imagen</label>
            <FileBase64 onDone={this.getFiles} />
            <div className="preview text-center">
              {preview}
            </div>
          </div>
          <button type="submit" className="btn btn-success" disabled={!this.state.formValid}>Crear beneficiario</button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CrearBeneficiado)