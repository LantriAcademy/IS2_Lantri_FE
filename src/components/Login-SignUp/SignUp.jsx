import React, { Component } from 'react';
import '../../styles/SignUp.css';
import WebApiService from '../Service/WebApiService';
import{FormControl, FormGroup, ControlLabel, ToggleButtonGroup, ToggleButton , ButtonToolbar} from "react-bootstrap"
import { FormErrors } from "../Helpers/FormErrors.js"

class SignUp extends Component {

  constructor (props) {
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
      text : 'Biografia (opcional)',
      director: true, //0 = Director o 1 = Contribuyente
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
      formValid: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {

    
     var data = {//Director
      'direction': 'directors',
      'param' : '',
      'body' : { "director": {"email": this.state.email, "password": this.state.password, "user": this.state.user, "name":this.state.name, "lastname":this.state.lastname, "phone":this.state.phone, "bio":this.state.biodes}},   
    }

     if(!this.state.director){ //Contribuyente
        data = {
        'direction': 'contributors',
        'param' : '',
        'body' : { "contributor": {"email": this.state.email, "password": this.state.password, "user": this.state.user, "name":this.state.name, "lastname":this.state.lastname, "phone":this.state.phone, "description":this.state.biodes}},   
      }
     }

    WebApiService.Post(data).then(res =>{
      if (res.status === 201) {
        alert("Usuario creado exitosamente")
        this.props.history.push("/")
      }else{
        alert("Problema al crear usuario, asegurese de no haber usado caracteres especiales como ñ o espacios en el nombre y/o apellido")
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
        this.state.formErrorsName.name = nameValid ? '': ' es obligatorio';
        break;
      case 'lastname':
        lastnameValid = value.length >= 1;
        this.state.formErrorsLastname.lastname = lastnameValid ? '': ' es obligatorio';
        break;
      case 'phone':
        phoneValid = value.length === 7 || value.length === 10;
        this.state.formErrorsPhone.phone = phoneValid ? '': ' no es valido';
        break;
      case 'user':
        userValid = value.length >= 1;
        this.state.formErrorsUser.user = userValid ? '': ' es obligatorio';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        this.state.formErrorsEmail.email = emailValid ? '' : ' no es valido';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        this.state.formErrorsPassword.password = passwordValid ? '': ' debe tener almenos 6 caracteres';
        break;
      case 'password2':
        password2Valid = value === this.state.password;
        this.state.formErrorsPassword2.password2 = password2Valid ? '': ' no son iguales';
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
    this.setState({formValid: this.state.nameValid && this.state.lastnameValid && this.state.phoneValid && 
                    this.state.userValid &&this.state.emailValid && this.state.passwordValid && this.state.password2Valid});
  }   
  
  render() {
      return (
        <div className="caja" >
          <form className="signUp" onSubmit={this.handleSubmit}>
            <h1 className="title">Registrate en f<b>UN</b>daciones</h1>
            <ControlLabel>Tipo de usuario</ControlLabel>
            <ButtonToolbar>
            <ToggleButtonGroup
              type="radio" name = "director"
              defaultValue={true}>
              <ToggleButton onClick={this.handleSelectedChange.bind(this, true)}  value = {true}>Director de fundación</ToggleButton>
              <ToggleButton onClick={this.handleSelectedChange.bind(this, false)} value={false}>Contribuyente</ToggleButton>
            </ToggleButtonGroup>
            </ButtonToolbar>
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
              <FormControl componentClass="textarea" name= "biodes" placeholder="Cuentanos mas sobre ti"
                    value={this.state.biodes}
                    onChange={this.handleUserInput} />
            </FormGroup>
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
              <button type="submit" className="btn btn-success" disabled={!this.state.formValid}>Registrarse</button>
          </form>
        </div>
      );
    }
  }
  
  export default SignUp;