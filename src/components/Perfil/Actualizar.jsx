import React, { Component } from 'react';
import '../../styles/SignUp.css';
import WebApiService from '../Service/WebApiService';
import { FormControl, FormGroup, ControlLabel, ToggleButtonGroup, ToggleButton, ButtonToolbar } from "react-bootstrap"
import { FormErrors } from "../Helpers/FormErrors.js"
import swal from 'sweetalert2'
import FileBase64 from '../Helpers/FileBase64';
import TagInput from '../TagInput/TagInput';
import DraggableMap from '../Fundacion/DraggableMap';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    user: state.user,
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

class Actualizar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      usuario: {},
      biodes: '',
      direction: '',
      lat: '',
      lng: '',
      description: '',
      howToHelp: '',
      contactUs: '',
      user: '',
      actualpassword: '',
      password: '',
      password2: '',
      name: '',
      lastname: '',
      email: '',
      Newfile:'',
      phone: '',
      file: "",
      text: "",
      formErrorsName: { name: '' },
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
      formValidInfo: false,
      formValidcontra: false,
      isLoading: true,
      buttonDisabledInfo: false,
      buttonDisabledPass: false,
      buttonDisabledImg: false,
      formErrorscontactUs: { contactUs: '' },
      formErrorshowToHelp: { howToHelp: '' },
      formErrorsdescription: { description: '' },
      contactUsValid: false,
      howToHelpValid: false,
      descriptionValid: false,
      direction: "",
      formErrorsDirection: { direction: '' }
    }
    this.getFiles = this.getFiles.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  componentWillMount() {
    this.props.ShowLoader();
    if (this.props.fundacion === true && this.props.foundation_id !==null) {
      var data = {
        'direction': 'foundations/',
        'param': this.props.foundation_id,
        'type': 1,
        'headers': { 'X-Director-Email': this.props.user.email, 'X-Director-Token': this.props.user.token }
      }
      this.setState({
        text: "Biografía (opcional)"
      });
    } else if (this.props.fundacion === false && this.props.director === true) {
      var data = {
        'direction': 'directors/',
        'param': this.props.user.id,
        'type': 1,
        'headers': { 'X-Director-Email': this.props.user.email, 'X-Director-Token': this.props.user.token }
      }
      this.setState({
        text: "Biografía (opcional)"
      });
    } else {
      var data = {
        'direction': 'contributors/',
        'param': this.props.user.id,
        'type': 1,
        'headers': { 'X-Contributor-Email': this.props.user.email, 'X-Contributor-Token': this.props.user.token }
      }
      this.setState({
        text: "Descripción (opcional)"
      });
    }

    WebApiService.GetAuthenticated(data).then(res => {
      this.setState({
        usuario: res
      });
      if (this.props.fundacion === false && this.props.director === true) {
      this.setState({
        biodes: res.bio
      });
      }else{
      this.setState({
        biodes: res.description
      });
      }
      this.props.HideLoader();
      this.setState({
        direction: res.direction, lat: res.latitude, lng: res.longitude, description: res.description, howToHelp: res.howToHelp, contactUs: res.contactUs,
        isLoading: false, user: res.user, name: res.name, lastname: res.lastname, phone: res.phone, file: res.avatar.url,
        email: res.email, emailValid: true, nameValid: true, lastnameValid: true, phoneValid: true
      });
      if (this.props.fundacion !== true) {
        this.validateField("phone", this.state.phone);
      }
    });
  }

  fileSelectedHandler = event => {
    console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0]
    });
  }
  getFiles(file) {
    this.setState({ Newfile: file });
  }
  onDragEnd(lat, lng) {
    this.setState({ lat: lat, lng: lng });
  }
  handleSubmitInfo(event) {
    //this.props.ShowLoader();
    this.setState({ buttonDisabledInfo: true });
    if (this.props.fundacion === true) {
      var data = {
        'direction': 'foundations/',
        'param': this.props.foundation_id,
        'body': { "foundation": { "name": this.state.name, "direction": this.state.direction, "latitude": this.state.lat, "longitude": this.state.lng, "description": this.state.description, "howToHelp": this.state.howToHelp, "contactUs": this.state.contactUs } },
        'headers': { 'X-Director-Email': this.props.user.email, 'X-Director-Token': this.props.user.token, 'Content-Type': 'application/json' }
      }
      this.setState({
        text: "Biografía (opcional)"
      });
    } else if (this.props.fundacion === false && this.props.director === true) {
      var data = {
        'direction': 'directors/',
        'param': this.props.id,
        'body': { "director": { "name": this.state.name, "lastname": this.state.lastname, "phone": this.state.phone, "email": this.state.email, "bio": this.state.biodes } },
        'headers': { 'X-Director-Email': this.props.email, 'X-Director-Token': this.props.token, 'Content-Type': 'application/json' }
      }
    }
    else {
      var data = {
        'direction': 'contributors/',
        'param': this.props.id,
        'body': { "contributor": { "name": this.state.name, "lastname": this.state.lastname, "phone": this.state.phone, "email": this.state.email, "description": this.state.biodes } },
        'headers': { 'X-Contributor-Email': this.props.email, 'X-Contributor-Token': this.props.token, 'Content-Type': 'application/json' }
      }
    }
    WebApiService.Patch(data).then(res => {
      //this.props.HideLoader();
      this.setState({ buttonDisabledInfo: false });
      if (res.status === 200) {
        this.props.ShowAlert("Información actualizada satisfactoriamente", "success");
      } else {
        this.props.ShowAlert("Error al actualizar la información" + res.status, "danger");
      }
    });

    event.preventDefault();
    window.location.reload()
  }
  handleSubmitPass(event) {
    //this.props.ShowLoader();
    this.setState({ buttonDisabledPass: true });
    var data = {
      'direction': 'contributors/',
      'param': this.props.id,
      'body': { "contributor": { "password": this.state.password, "password_confirmation": this.state.password2 } },
      'headers': { 'X-Contributor-Email': this.props.email, 'X-Contributor-Token': this.props.token, 'Content-Type': 'application/json' }
    }
    WebApiService.Patch(data).then(res => {
      //this.props.HideLoader();
      this.setState({ buttonDisabledPass: false });
      if (res.status === 200) {
        this.props.ShowAlert("Contraseña actualizada satisfactoriamente", "success");
      } else {
        this.props.ShowAlert("Error al actualizar la contraseña" + res.status, "danger");
      }
    });

    event.preventDefault();
    window.location.reload()
  }

  handleSubmitImage(event) {
    this.setState({ buttonDisabledImg: true });
    if (this.props.fundacion === true) {
      console.log("Fundacion")
      var data = {
        'direction': 'foundations/',
        'param': this.props.foundation_id,
        'body': { "foundation": { "avatar": this.state.Newfile.base64 } },
        'headers': { 'X-Director-Email': this.props.email, 'X-Director-Token': this.props.token, 'Content-Type': 'application/json' }
      }
    } else if (this.props.fundacion === false && this.props.director === true) {
      var data = {
        'direction': 'directors/',
        'param': this.props.id,
        'body': { "director": { "avatar": this.state.Newfile.base64 } },
        'headers': { 'X-Director-Email': this.props.email, 'X-Director-Token': this.props.token, 'Content-Type': 'application/json' }
      }
    }
    else {
      var data = {
        'direction': 'contributors/',
        'param': this.props.id,
        'body': { "contributor": { "avatar": this.state.Newfile.base64 } },
        'headers': { 'X-Contributor-Email': this.props.email, 'X-Contributor-Token': this.props.token, 'Content-Type': 'application/json' }
      }
    }
    WebApiService.Patch(data).then(res => {
      //this.props.HideLoader();
      this.setState({ buttonDisabledImg: false });
      if (res.status === 200) {
        this.props.ShowAlert("Imagen actualizada satisfactoriamente", "success");
      } else {
        this.props.ShowAlert("Error al actualizar la Imagen" + res.status, "danger");
      }
    });

    event.preventDefault();
    window.location.reload()
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
      texto = "Descripción (opcional)"
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
    let formErrorsDirection = this.state.formErrorsDirection;
    let formErrorshowToHelp = this.state.formErrorshowToHelp;
    let formErrorscontactUs = this.state.formErrorscontactUs;
    let formErrorsdescription = this.state.formErrorsdescription;
    let directionValid = this.state.directionValid;
    let descriptionValid = this.state.descriptionValid;
    let howToHelpValid = this.state.howToHelpValid;
    let contactUsValid = this.state.contactUsValid;

    switch (fieldName) {
      case 'name':
        nameValid = value.length >= 1;
        formErrorsName.name = nameValid ? '' : ' es obligatorio';
        break;
      case 'lastname':
        lastnameValid = value.length >= 1;
        formErrorsLastname.lastname = lastnameValid ? '' : ' es obligatorio';
        break;
      case 'phone':
        phoneValid = value.length === 7 || value.length === 10;
        formErrorsPhone.phone = phoneValid ? '' : ' no es valido, debe tener 7 o 10 digitos';
        break;
      case 'user':
        userValid = value.length >= 1;
        formErrorsUser.user = userValid ? '' : ' es obligatorio';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        formErrorsEmail.email = emailValid ? '' : ' no es valido';
        break;
      case 'password':
        passwordValid = value.length >= 6;
        formErrorsPassword.password = passwordValid ? '' : ' debe tener almenos 6 caracteres';
        break;
      case 'password2':
        password2Valid = value === this.state.password;
        formErrorsPassword2.password2 = password2Valid ? '' : ' no son iguales';
        break;
      case 'direction':
        directionValid = value.length >= 4;
        formErrorsDirection.direction = directionValid ? '' : ' no es valida.';
        break;
      case 'description':
        descriptionValid = value.length >= 2;
        formErrorsdescription.description = descriptionValid ? '' : ' es obligatoria.';
        break;
      case 'howToHelp':
        howToHelpValid = value.length >= 4;
        formErrorshowToHelp.howToHelp = howToHelpValid ? '' : ' son obligatorias';
        break;
      case 'contactUs':
        contactUsValid = value.length >= 2;
        formErrorscontactUs.contactUs = contactUsValid ? '' : ' es obligatoria.';
        break;
      default:
        break;
    }
    this.setState({
      emailValid: emailValid,
      passwordValid: passwordValid,
      password2Valid: password2Valid,
      nameValid: nameValid,
      lastnameValid: lastnameValid,
      phoneValid: phoneValid,
      userValid: userValid,
      directionValid: directionValid,
      descriptionValid: descriptionValid,
      howToHelpValid: howToHelpValid,
      contactUsValid: contactUsValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValidInfoFund: this.state.nameValid && this.state.directionValid && this.state.descriptionValid && this.state.howToHelpValid && this.state.contactUsValid });
    this.setState({ formValidInfo: this.state.nameValid && this.state.lastnameValid && this.state.phoneValid && this.state.emailValid });
    this.setState({ formValidcontra: this.state.passwordValid && this.state.password2Valid });
  }


  render() {
    const preview = (this.state.Newfile !== "" ? <img src={this.state.Newfile.base64} height="180" width="210" alt="Preview" /> : "");
    if (this.props.fundacion === false) {
  return (
        <div className="caja" >
          <form className="signUp" onSubmit={this.handleSubmit}>
            <h1 className="title">Actualiza tu información</h1>
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

            <button onClick={(e) => this.handleSubmitInfo(e)} className="btn btn-success" disabled={!this.state.formValidInfo || this.state.buttonDisabledInfo}>Actualizar información</button>

            <h1 className="title">Cambie su contraseña</h1>
            <FormGroup>
              <ControlLabel>Contraseña actual</ControlLabel>
              <input type="password" className="form-control" name="actualpassword"
                placeholder="Contraseña actual"
                value={this.state.actualpassword}
                onChange={this.handleUserInput} />
            </FormGroup>
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
            <button type="submit" onClick={(e) => this.handleSubmitPass(e)} className="btn btn-success" disabled={!this.state.formValidcontra || this.state.buttonDisabledPass}>Actualizar Contraseña</button>

            <h1 className="title">Cambie su foto de perfil</h1>
            <div className="form-group">
              <label>Imagen</label>
              <FileBase64 onDone={this.getFiles} />
              <div className="preview text-center">
                {preview}
              </div>
            </div>
            <button type="submit" onClick={(e) => this.handleSubmitImage(e)} className="btn btn-success" disabled={this.state.buttonDisabledImg}>Actualizar imagen</button>
          </form>
        </div>
      );
    } else {
      return (
        <div>
          <form className="caja" onSubmit={this.handleSubmit}>
            <h1 className="title">Actualizar mi fundación</h1>
            <img src={WebApiService.baseUrl + this.state.file} alt="Logo" height="220" width="260" />
            <div className="form-group">
              <label>Nombre</label>
              <input type="text" className="form-control" name="name"
                placeholder="Nombre"
                value={this.state.name}
                onChange={this.handleUserInput} />
            </div>
            <FormErrors formErrors={this.state.formErrorsName} />
            <div className="form-group">
              <label>Dirección</label>
              <input type="text" className="form-control" name="direction"
                placeholder="Dirección"
                value={this.state.direction}
                onChange={this.handleUserInput} />
            </div>
            <FormErrors formErrors={this.state.formErrorsDirection} />
            <div className="form-group">
              <p><strong>Ubicación: </strong>Arrastre el marcardor a la ubicación deseada.</p>

              <DraggableMap defaultCenter={{ lat: this.state.lat, lng: this.state.lng }} onDragEnd={this.onDragEnd} />
            </div>
            <div className="form-group">
              <label>Descripción</label>
              <textarea name="description" type="text" className="form-control" placeholder="Descripción"
                value={this.state.description}
                onChange={this.handleUserInput} />
            </div>
            <FormErrors formErrors={this.state.formErrorsdescription} />
            <div className="form-group">
              <label>Formas de ayuda</label>
              <textarea name="howToHelp" type="text" className="form-control" placeholder="Escriba las diferentes formas de ayudar a la fundación"
                value={this.state.howToHelp}
                onChange={this.handleUserInput} />
            </div>
            <FormErrors formErrors={this.state.formErrorshowToHelp} />
            <div className="form-group">
              <label>Informacion de contacto</label>
              <textarea name="contactUs" type="text" className="form-control" placeholder="Escriba la informacion de contacto de la fundación"
                value={this.state.contactUs}
                onChange={this.handleUserInput} />
            </div>
            <FormErrors formErrors={this.state.formErrorscontactUs} />
            <button onClick={(e) => this.handleSubmitInfo(e)} className="btn btn-success" disabled={!this.state.formValidInfo || this.state.buttonDisabledInfo}>Actualizar información</button>
            <h1 className="title">Cambie la imagen</h1>
            <div className="form-group">
              <label>Imagen</label>
              <FileBase64 onDone={this.getFiles} />
              <div className="preview text-center">
                {preview}
              </div>
            </div>
            <button type="submit" onClick={(e) => this.handleSubmitImage(e)} className="btn btn-success" disabled={this.state.buttonDisabledImg}>Actualizar imagen</button>
         </form>
        </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Actualizar);