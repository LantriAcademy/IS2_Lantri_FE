import React, { Component } from 'react';
import '../styles/SignUp.css';
import{FormControl, FormGroup, ControlLabel} from "react-bootstrap"
import { FormErrors } from "./FormErrors.js"

class SignUp extends Component {
  
  constructor (props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      formErrors: {email: '', password: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
}

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
  
    switch(fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' no es valido';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '': ' debe tener almenos 6 caracteres';
        break;
      default:
        break;
    }
    this.setState({formErrors: fieldValidationErrors,
                    emailValid: emailValid,
                    passwordValid: passwordValid
                  }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValid: this.state.emailValid && this.state.passwordValid});
  }   
  
  
  render() {
      return (
        <div className="caja" >
          <form className="login">
            <h1 className="title">Registrate en f<b>UN</b>daciones</h1>
            <FormGroup>
              <ControlLabel>Nombre Completo</ControlLabel>
              <input type="name" className="form-control" id="name" placeholder="Nombre"/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Correo Electronico</ControlLabel>
              <input type="email" className="form-control" name="email" 
                      aria-describedby="emailHelp" 
                      placeholder="Correo Electronico"
                      value={this.state.email}
                      onChange={this.handleUserInput} />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Contraseña</ControlLabel>
              <input type="password" className="form-control" name="password" 
                      placeholder="Contraseña"                      
                      value={this.state.password}
                      onChange={this.handleUserInput} />
             </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Tipo de usuario</ControlLabel>
              <FormControl componentClass="select" placeholder="select">
                <option value="usuario">Padrino</option>
                <option value="fundacion">Fundacion</option>
              </FormControl>
            </FormGroup>
            <div>
              <br/>
                <FormErrors formErrors={this.state.formErrors} />
            </div> 
              <button type="submit" className="btn btn-success" disabled={!this.state.formValid}>Registrarse</button>
          </form>
        </div>
      );
    }
  }
  
  export default SignUp;