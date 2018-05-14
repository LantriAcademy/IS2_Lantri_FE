import React from 'react';
import { Link } from "react-router-dom";
import { FormGroup, ControlLabel, Modal, ToggleButtonGroup, ToggleButton, ButtonToolbar } from 'react-bootstrap';
import WebApiService from '../Service/WebApiService';
import "../../styles/LoginModal.css";
import { FormErrors } from "../Helpers/FormErrors.js"
import { connect } from 'react-redux';
import { GoogleLogin } from 'react-google-login';
import config from '../../config.json';
import swal from 'sweetalert2'

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
      formErrorsEmail: {email: ''},
      formErrorsPassword: {user: ''},
      emailValid: false,
      passwordValid: false,
      formValid: false,
      buttonDisabled: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {

    //alert('A password was submitted: ' + this.state.password);
    //alert('A email was submitted: ' + this.state.email);
    //alert('A type was submitted: ' + this.state.type);
    this.setState({buttonDisabled: true});
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
      //console.log(res);
      this.setState({buttonDisabled: false});
      if (res.status === 201) {
        res.json().then(result => {
          //console.log(result);
          if (!this.state.director) { //Contribuyente
            this.props.login(result.authentication_token, result.contributor_id, result.foundation_id, this.state.director, result.email);
          }else {
            this.props.login(result.authentication_token, result.id, result.foundation_id, this.state.director, result.email);  
          }
          this.props.hide();
        });
      } else {
        //alert("Revisa tu contraseña e intentalo de nuevo!");
        swal(
          'Error',
          'Revisa tu contraseña e intentalo de nuevo!',
          'error'
        )
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
    let formErrorsEmail = this.state.formErrorsEmail;
    let formErrorsPassword = this.state.formErrorsPassword;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrorsEmail.email = emailValid ? '' : ' no es valido';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        formErrorsPassword.password = passwordValid ? '' : ' debe tener almenos 6 caracteres';
        break;
      default:
        break;
    }
    this.setState({
      emailValid: emailValid,
      passwordValid: passwordValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid });
  }

  googleResponse = (response) => {
    //console.log(response)
    this.setState({buttonDisabled: true});
    var data = {//Director
      'direction': '/signin_director/google',
      'param': '',
      'body': response,
    }

    if (!this.state.director) { //Contribuyente
      data = {
        'direction': '/signin_contributor/google',
        'param': '',
        'body': response
      }
    }
    
    WebApiService.Post(data).then(res => {
      //console.log(res)
      this.setState({buttonDisabled: false});
      if (res.status === 201) {
        res.json().then(result => {
          if (!this.state.director) {
            this.props.login(result.authentication_token, result.contributor_id, result.foundation_id, this.state.director, result.email);
          }else {
            this.props.login(result.authentication_token, result.id, result.foundation_id, this.state.director, result.email);  
          }
          this.props.hide();
        });
      } else {
        swal(
          'Error',
          'Something went wrong',
          'error'
        )
      }
    });
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
              <ControlLabel>Tipo de usuario</ControlLabel>
              <ButtonToolbar>
                <ToggleButtonGroup
                  type="radio" name="director"
                  defaultValue={true}>
                  <ToggleButton onClick={this.handleSelectedChange.bind(this, true)} value={true}>Director de fundación</ToggleButton>
                  <ToggleButton onClick={this.handleSelectedChange.bind(this, false)} value={false}>Contribuyente</ToggleButton>
                </ToggleButtonGroup>
              </ButtonToolbar>
              <br/>
              <FormGroup>
                <ControlLabel>Correo Electronico</ControlLabel>
                <input type="email" className="form-control" name="email"
                  aria-describedby="emailHelp"
                  placeholder="Correo Electronico"
                  value={this.state.email}
                  onChange={this.handleUserInput} />
              </FormGroup>
              <div>
                <FormErrors formErrors={this.state.formErrorsEmail} />
              </div>
              <FormGroup>
                <ControlLabel>Contraseña</ControlLabel>
                <input type="password" className="form-control" name="password"
                  placeholder="Contraseña"
                  value={this.state.password}
                  onChange={this.handleUserInput} />
                <Link to="/passwordEmail" onClick={this.props.hide}>¿Olvidaste tu contraseña?</Link>
              </FormGroup>
              <div>
                <FormErrors formErrors={this.state.formErrorsPassword} />
              </div>
              <button type="submit" className="btn btn-success" disabled={!this.state.formValid || this.state.buttonDisabled}>Iniciar Sesion</button>
              <GoogleLogin
                  clientId={config.GOOGLE_CLIENT_ID}
                  buttonText="Login"
                  onSuccess={this.googleResponse}
                  onFailure={this.onFailure}
                  disabled={this.state.buttonDisabled}
                  className="btn btnGoogle"
                > 
                  <span>Sign In with Google</span>                                                               
                </GoogleLogin>
              <p>¿No tienes cuenta?  <Link to="/signup" style={{fontWeight: "700"}} onClick={this.props.hide}>Registrarse</Link></p>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);