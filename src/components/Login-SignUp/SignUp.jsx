import React, { Component } from 'react';
import '../../styles/SignUp.css';
import WebApiService from '../Service/WebApiService';
import { FormControl, FormGroup, ControlLabel, ToggleButtonGroup, ToggleButton, ButtonToolbar } from "react-bootstrap"
import { FormErrors } from "../Helpers/FormErrors.js"

import { connect } from 'react-redux';
import TagInput from '../TagInput/TagInput';

import SecurePassword from '../Helpers/SecurePassword';
import swal from 'sweetalert2'

const mapStateToProps = state => {
  return {
    loading: state.loading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    ShowLoader: () => dispatch({
      type: 'SHOW'
    }),
    HideLoader: () => dispatch({
      type: 'HIDE'
    }),
    ShowAlert: (message, typeAlert) => dispatch({
      type: 'SHOWALERT', message: message, typeAlert: typeAlert
    })
  }
}

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      biodes: '',
      user: '',
      password: '',
      password2: '',
      name: '',
      lastname: '',
      email: '',
      phone: '',
      text: 'Biografia (opcional)',
      director: true, //0 = Director o 1 = Contribuyente
      formErrorsName: { name: '' },
      formErrorsBiodes: { biodes: '' },
      formErrorsLastname: { lastname: '' },
      formErrorsPhone: { phone: '' },
      formErrorsUser: { user: '' },
      formErrorsEmail: { email: '' },
      formErrorsPassword: { password: '' },
      formErrorsPassword2: { password2: '' },
      nameValid: false,
      lastnameValid: false,
      phoneValid: false,
      userValid: false,
      emailValid: false,
      passwordValid: false,
      password2Valid: false,
      biodesValid: false,
      formValid: false,
      tags: [],
      buttonDisabled: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);

  }
  handleTagChange(tags) {
    this.setState({ tags })
  }

  handleSubmit(event) {
    event.preventDefault();
    var patt = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm;
    var test = patt.test(this.state.password);
    if (!test) {
      swal(
        'Error',
        'Recuerda: 1 letra y 1 número al menos',
        'error'
      );
      return;
    }
    SecurePassword.GetPasswordFile().then(rawFile => {
      rawFile.text().then(allText => {
        var textSplited = allText.split("\n");
        for (var i = 0; i < textSplited.length; i++) {
          if (this.state.password.trim() == textSplited[i].trim()) {
            swal(
              'Error',
              'Esta contraseña ya es conocida por el mundo, prueba con otra',
              'error'
            );
            return;
          }
        }
        this.setState({ buttonDisabled: true });
        var data = {//Director
          'direction': 'directors',
          'param': '',
          'body': { "director": { "email": this.state.email, "password": this.state.password, "user": this.state.user, "name": this.state.name, "lastname": this.state.lastname, "phone": this.state.phone, "bio": this.state.biodes } },
        }

        if (!this.state.director) { //Contribuyente
          data = {
            'direction': 'contributors',
            'param': '',
            'body': { "contributor": { "email": this.state.email, "password": this.state.password, "user": this.state.user, "name": this.state.name, "lastname": this.state.lastname, "phone": this.state.phone, "description": this.state.biodes }, "interest": this.state.tags },
          }
        }


        WebApiService.Post(data).then(res => {
          //this.props.HideLoader();
          this.setState({ buttonDisabled: false });

          if (res.status === 201) {
            this.props.history.push("/");
            this.props.ShowAlert("Usuario creado satisfactoriamente", "success");
          } else {
            this.props.ShowAlert("Problema al crear usuario", "danger");
          }
        });
      });
    });
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }

  handleSelectedChange(e) {
    var texto = ''
    if (e) { //Director
      texto = "Biografia (opcional)"
    } else { //Contribuyente
      texto = "Descripcion (opcional)"
    }
    this.setState({
      director: e,
      text: texto
    });

  }

  validateField(fieldName, value) {
    var er1 = new RegExp("[></'+" + '"]');
    let formErrorsBiodes = this.state.formErrorsBiodes;
    let biodesValid = this.state.biodesValid;
    let formErrorsName = this.state.formErrorsName;
    let formErrorsLastname = this.state.formErrorsLastname;
    let formErrorsPhone = this.state.formErrorsPhone;
    let formErrorsUser = this.state.formErrorsUser;
    let formErrorsEmail = this.state.formErrorsEmail;
    let formErrorsPassword = this.state.formErrorsPassword;
    let formErrorsPassword2 = this.state.formErrorsPassword2;
    let nameValid = this.state.nameValid;
    let lastnameValid = this.state.lastnameValid;
    let phoneValid = this.state.phoneValid;
    let userValid = this.state.userValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let password2Valid = this.state.password2Valid;

    switch (fieldName) {
      case 'name':
        if (value.match(er1)) {
          nameValid = false;
        } else {
          nameValid = value.length >= 1;
        }
        formErrorsName.name = nameValid ? '' : ' es vacío o' + " Contiene un caracter invalido (< > ' " + ' " /)';
        break;
      case 'lastname':
        if (value.match(er1)) {
          lastnameValid = false;
        } else {
          lastnameValid = value.length >= 1;
        }
        formErrorsLastname.lastname = lastnameValid ? '' : ' es vacío o' + " Contiene un caracter invalido (< > ' " + ' " /)';
        break;
      case 'phone':
        if (value.match(er1)) {
          phoneValid = false;
        } else {
          phoneValid = value.length === 7 || value.length === 10;
        }
        formErrorsPhone.phone = phoneValid ? '' : ' no es valido, debe tener 7 o 10 digitos';
        break;
      case 'user':
        if (value.match(er1)) {
          userValid = false;
        } else {
          userValid = value.length >= 1;
        }
        formErrorsUser.user = userValid ? '' : ' es vacío o' + " Contiene un caracter invalido (< > ' " + ' " /)';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrorsEmail.email = emailValid ? '' : ' no es valido';
        break;
      case 'password':
        passwordValid = value.length >= 8;
        formErrorsPassword.password = passwordValid ? '' : ' debe tener almenos 8 caracteres';
        break;
      case 'password2':
        password2Valid = value === this.state.password;
        formErrorsPassword2.password2 = password2Valid ? '' : ' no son iguales';
        break;
      case 'biodes':
        if (value.match(er1)) {
          biodesValid = false;
        } else {
          biodesValid = true;
        }
        formErrorsBiodes.biodes = biodesValid ? '' : " Contiene un caracter invalido (< > ' " + ' " /)';
        break;
      default:
        break;
    }
    this.setState({
      biodesValid: biodesValid,
      emailValid: emailValid,
      passwordValid: passwordValid,
      password2Valid: password2Valid,
      nameValid: nameValid,
      lastnameValid: lastnameValid,
      phoneValid: phoneValid,
      userValid: userValid
    }, this.validateForm);


  }

  validateForm() {
    this.setState({
      formValid: this.state.nameValid && this.state.lastnameValid && this.state.phoneValid &&
        this.state.userValid && this.state.emailValid && this.state.passwordValid && this.state.password2Valid && this.state.biodesValid
    });
  }

  render() {
    return (
      <div className="caja" >
        <form className="signUp" onSubmit={this.handleSubmit}>
          <h1 className="title">Registrate en f<b>UN</b>daciones</h1>
          <ControlLabel>Tipo de usuario</ControlLabel>
          <ButtonToolbar>
            <ToggleButtonGroup
              type="radio" name="director"
              defaultValue={true}>
              <ToggleButton onClick={this.handleSelectedChange.bind(this, true)} value={true}>Director de fundación</ToggleButton>
              <ToggleButton onClick={this.handleSelectedChange.bind(this, false)} value={false}>Contribuyente</ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
          <br />
          <FormGroup>
            <ControlLabel>Nombre</ControlLabel>
            <input type="name" className="form-control" name="name"
              placeholder="Nombre"
              value={this.state.name}
              onChange={this.handleUserInput} />
          </FormGroup>
          <div>
            <FormErrors formErrors={this.state.formErrorsName} />
          </div>
          <FormGroup>
            <ControlLabel>Apellidos</ControlLabel>
            <input type="name" className="form-control" name="lastname"
              placeholder="Apellidos"
              value={this.state.lastname}
              onChange={this.handleUserInput} />
          </FormGroup>
          <div>
            <FormErrors formErrors={this.state.formErrorsLastname} />
          </div>
          <FormGroup>
            <ControlLabel>Número de teléfono</ControlLabel>
            <input type="name" className="form-control" name="phone"
              placeholder="Número de teléfono"
              value={this.state.phone}
              onChange={this.handleUserInput} />
          </FormGroup>
          <div>
            <FormErrors formErrors={this.state.formErrorsPhone} />
          </div>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel >{this.state.text} </ControlLabel>
            <FormControl componentClass="textarea" name="biodes" placeholder="Cuentanos mas sobre ti"
              value={this.state.biodes}
              onChange={this.handleUserInput} />
          </FormGroup>
          <div>
            <FormErrors formErrors={this.state.formErrorsBiodes} />
          </div>
          {!this.state.director &&
            <div className="form-group">
              <label>Preferencias</label>
              <TagInput UpdateTagsParent={this.handleTagChange} />
            </div>
          }
          <FormGroup>
            <ControlLabel>Usuario</ControlLabel>
            <input type="name" className="form-control" name="user"
              placeholder="Usuario"
              value={this.state.user}
              onChange={this.handleUserInput} />
          </FormGroup>
          <div>
            <FormErrors formErrors={this.state.formErrorsUser} />
          </div>
          <FormGroup>
            <ControlLabel>Correo Electrónico</ControlLabel>
            <input type="email" className="form-control" name="email"
              placeholder="Correo Electrónico"
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
          </FormGroup>
          <div>
            <FormErrors formErrors={this.state.formErrorsPassword} />
          </div>
          <FormGroup>
            <ControlLabel>Confirme su contraseña</ControlLabel>
            <input type="password" className="form-control" name="password2"
              placeholder="Contraseña"
              value={this.state.password2}
              onChange={this.handleUserInput} />
          </FormGroup>
          <div>
            <FormErrors formErrors={this.state.formErrorsPassword2} />
          </div>
          <button type="submit" className="btn btn-success" disabled={!this.state.formValid || this.state.buttonDisabled}>Registrarse</button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);