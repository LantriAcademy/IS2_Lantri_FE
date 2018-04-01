import React from 'react';
import { Link } from "react-router-dom";
import { Modal} from 'react-bootstrap';
import "../styles/LoginModal.css";
import { FormErrors } from "./FormErrors.js"

class LoginModal extends React.Component {
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
      <div>
        <Modal show={this.props.show} onHide={this.props.hide} bsSize="small">
          <Modal.Header closeButton>
            <Modal.Title bsClass="text-center">
               Inicio de sesión 
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="login">
              <div className={"from-group"}>
                <label>Correo Electronico</label>
                <input type="email" className="form-control" name="email" 
                      aria-describedby="emailHelp" 
                      placeholder="Correo Electronico"
                      value={this.state.email}
                      onChange={this.handleUserInput} />
              </div>
              <div className={"from-group"}>
              <br/>
                <label>Contraseña</label>
                <input type="password" className="form-control" name="password" 
                      placeholder="Contraseña"                      
                      value={this.state.password}
                      onChange={this.handleUserInput} />
              </div>
              <div>
              <br/>
                <FormErrors formErrors={this.state.formErrors} />
              </div>
              <button type="submit" className="btn btn-success"  disabled={!this.state.formValid}>Iniciar Sesion</button>
              <p>¿No tienes cuenta?  <Link to="/signup" onClick={this.props.hide}>Registrarse</Link></p>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
export default LoginModal;