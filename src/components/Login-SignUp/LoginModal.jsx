import React from 'react';
import { Link } from "react-router-dom";
import { FormGroup, ControlLabel, Modal, ToggleButtonGroup, ToggleButton, ButtonToolbar } from 'react-bootstrap';
import WebApiService from '../Service/WebApiService';
import "../../styles/LoginModal.css";
import { FormErrors } from "../Helpers/FormErrors.js"
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import config from '../../config.json';

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    login: (token, id, foundationId, userType, email) => dispatch({
      type: 'LOGIN', token: token, id: id, foundationId: foundationId, userType: userType, email: email
    }),
    logoff: () => ({
      type: 'LOGOFF'
    }),
  }
}


class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      director: true, //0 = Director o 1 = Contribuyente
      formErrors: { email: '', password: '' },
      emailValid: false,
      passwordValid: false,
      formValid: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {

    //alert('A password was submitted: ' + this.state.password);
    //alert('A email was submitted: ' + this.state.email);
    //alert('A type was submitted: ' + this.state.type);

    var data = {//Director
      'direction': 'signin_director',
      'param': '',
      'body': { "email": this.state.email, "password": this.state.password },
    }

    if (!this.state.director) { //Contribuyente
      data = {
        'direction': 'signin_contributor',
        'param': '',
        'body': { "email": this.state.email, "password": this.state.password },
      }
    }

    WebApiService.Post(data).then(res => {
      if (res.status === 201) {
        res.json().then(result => {
          console.log(result);
          this.props.login(result.authentication_token, result.id, result.foundation_id, this.state.director, result.email);
          this.props.hide();
        });
      } else {
        alert("Revisa tu contraseña e intentalo de nuevo!");
      }
    });
    event.preventDefault();
  }

  handleSelectedChange(e) {
    this.setState({
      director: e,
    });
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' no es valido';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? '' : ' debe tener almenos 6 caracteres';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
  }

  googleResponse = (response) => {
    console.log(response)
  }

  onFailure = (error) => {
    console.log(error)
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
            <form className="login" onSubmit={this.handleSubmit}>
              <FormGroup>
                <ControlLabel>Correo Electronico</ControlLabel>
                <input type="email" className="form-control" name="email"
                  aria-describedby="emailHelp"
                  placeholder="Correo Electronico"
                  value={this.state.email}
                  onChange={this.handleUserInput} />
              </FormGroup>
              <FormGroup>
                <br />
                <ControlLabel>Contraseña</ControlLabel>
                <input type="password" className="form-control" name="password"
                  placeholder="Contraseña"
                  value={this.state.password}
                  onChange={this.handleUserInput} />
              </FormGroup>
              <ControlLabel>Tipo de usuario</ControlLabel>
              <ButtonToolbar>
                <ToggleButtonGroup
                  type="radio" name="director"
                  defaultValue={true}>
                  <ToggleButton onClick={this.handleSelectedChange.bind(this, true)} value={true}>Director de fundación</ToggleButton>
                  <ToggleButton onClick={this.handleSelectedChange.bind(this, false)} value={false}>Contribuyente</ToggleButton>
                </ToggleButtonGroup>
              </ButtonToolbar>
              <div>
                <br />
                <FormErrors formErrors={this.state.formErrors} />
              </div>
              <button type="submit" className="btn btn-success" disabled={!this.state.formValid}>Iniciar Sesion</button>
              <div>
                <GoogleLogin
                  clientId={config.GOOGLE_CLIENT_ID}
                  buttonText="Login"
                  onSuccess={this.googleResponse}
                  onFailure={this.onFailure}
                  className="btnGoogle"
                > 
                  <span>Sign In with Google</span>                                                               
                </GoogleLogin>
              </div>
              <p>¿No tienes cuenta?  <Link to="/signup" onClick={this.props.hide}>Registrarse</Link></p>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);