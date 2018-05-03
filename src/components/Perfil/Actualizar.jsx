import React, { Component } from 'react';
import '../../styles/SignUp.css';
import WebApiService from '../Service/WebApiService';
import{FormControl, FormGroup, ControlLabel, ToggleButtonGroup, ToggleButton , ButtonToolbar} from "react-bootstrap"
import { FormErrors } from "../Helpers/FormErrors.js"
import swal from 'sweetalert2'

import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    user: state.user,
    loading : state.loading
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
      ShowAlert: (message, typeAlert) =>dispatch({
          type : 'SHOWALERT', message: message, typeAlert: typeAlert
      })
  }
}

class Actualizar extends Component {

  constructor (props) {
    super(props);
    this.state = {
      usuario:{},
      biodes: '',
      user: '',
      password: '',
      password2: '',
      name: '',
      lastname: '',
      email: '',
      phone: '',
      text : 'Biografia (opcional)',
      formErrorsName: {name: ''},
      formErrorsLastname: {lastname: ''},
      formErrorsPhone: {phone: ''},
      formErrorsUser: {user: ''},
      formErrorsEmail: {email: ''},
      formErrorsPassword: {password: ''},
      formErrorsPassword2: {password2: ''},
      nameValid: false,
      lastnameValid: false,
      phoneValid: false,
      userValid: false,
      emailValid: false,
      passwordValid: false,
      password2Valid: false,
      formValidInfo: false,
      formValidcontra: false,
      isLoading: true
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.props.ShowLoader();

    var data = {
      'direction': 'contributors/',
      'param' : this.props.user.id,
      'type' : 1,
      'headers': {'X-Contributor-Email': this.props.user.email, 'X-Contributor-Token': this.props.user.token}
    }

    WebApiService.GetAuthenticated(data).then(res => {
      this.setState({
        usuario: res,
      });
      this.props.HideLoader();
      this.setState({isLoading: false,user: res.user, name: res.name, lastname: res.lastname, biodes: res.description, phone: res.phone, email: res.email, emailValid: true });
    });
    this.validateField('name',this.state.name);
    this.validateField('lastname',this.state.lastname);
    this.validateField('phone',this.state.phone);
  }

  handleSubmit(event) {
    this.props.ShowLoader();

    var data = {
        'direction': 'contributors/' + this.props.user.id,
        'body' : {"id": this.props.user.id,"email": this.state.email, "user": this.state.user, "name":this.state.name, "lastname":this.state.lastname, "phone":this.state.phone, "description":this.state.biodes},   
        'type' : 1,
        'headers': {'X-Contributor-Email': this.props.user.email, 'X-Contributor-Token': this.props.user.token}
      }
    
      console.log(data);
    WebApiService.Put(data).then(res =>{
      this.props.HideLoader();
      if (res.status === 200) {
        this.props.ShowAlert("Información actualizada satisfactoriamente", "success");
      }else{
        this.props.ShowAlert("Error al actualizar la información", "danger");
      }
    });
    
    event.preventDefault();
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({[name]: value},
                  () => { this.validateField(name, value) });
  }

  handleSelectedChange(e) {
    var texto = ''
    if(e){ //Director
      texto = "Biografia (opcional)"
    }else{ //Contribuyente
      texto = "Descripcion (opcional)"
    }
    this.setState({
      director: e,
      text: texto
    });

  }

  validateField(fieldName, value) {
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
  
    switch(fieldName) {
      case 'name':
        nameValid = value.length >= 1;
        formErrorsName.name = nameValid ? '': ' es obligatorio';
        break;
      case 'lastname':
        lastnameValid = value.length >= 1;
        formErrorsLastname.lastname = lastnameValid ? '': ' es obligatorio';
        break;
      case 'phone':
        phoneValid = value.length === 7 || value.length === 10;
        formErrorsPhone.phone = phoneValid ? '': ' no es valido, debe tener 7 o 10 digitos';
        break;
      case 'user':
        userValid = value.length >= 1;
        formErrorsUser.user = userValid ? '': ' es obligatorio';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrorsEmail.email = emailValid ? '' : ' no es valido';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        formErrorsPassword.password = passwordValid ? '': ' debe tener almenos 6 caracteres';
        break;
      case 'password2':
        password2Valid = value === this.state.password;
        formErrorsPassword2.password2 = password2Valid ? '': ' no son iguales';
        break;
      default:
        break;
    }
    this.setState({ emailValid: emailValid,
                    passwordValid: passwordValid,
                    password2Valid: password2Valid,
                    nameValid: nameValid,
                    lastnameValid: lastnameValid,
                    phoneValid: phoneValid,
                    userValid: userValid
                  }, this.validateForm);
  }
  
  validateForm() {
    this.setState({formValidInfo: this.state.nameValid && this.state.lastnameValid && this.state.phoneValid &&this.state.emailValid});
    this.setState({formValidcontra:this.state.passwordValid && this.state.password2Valid});
  }   

  
  render() {
      return (
        <div className="caja" >
          <form className="signUp" onSubmit={this.handleSubmit}>
            <h1 className="title">Actualiza tu información</h1>
            <br/>
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
                    value= {this.state.lastname}
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
              <FormControl componentClass="textarea" name= "biodes" placeholder="Cuentanos mas sobre ti"
                    value={this.state.biodes}
                    onChange={this.handleUserInput} />
            </FormGroup>
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

            <button type="submit" className="btn btn-success" disabled={!this.state.formValidInfo}>Actualizar información</button>

            <h1 className="title">Cambie su contrseña</h1>
            <FormGroup>
              <ControlLabel>Nueva Contraseña</ControlLabel>
              <input type="password" className="form-control" name="password" 
                      placeholder="Contraseña"                    
                      value={this.state.password}
                      onChange={this.handleUserInput} />
             </FormGroup>
             <div>
                <FormErrors formErrors={this.state.formErrorsPassword} />
            </div> 
             <FormGroup>
              <ControlLabel>Confirme la contraseña</ControlLabel>
              <input type="password" className="form-control" name="password2" 
                      placeholder="Confirme la contraseña"                    
                      value={this.state.password2}
                      onChange={this.handleUserInput} />
             </FormGroup>
            <div>
                <FormErrors formErrors={this.state.formErrorsPassword2} />
            </div> 
              <button type="submit" className="btn btn-success" disabled={!this.state.formValidcontra}>Actualizar Contraseña</button>
          </form>
        </div>
      );
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Actualizar);