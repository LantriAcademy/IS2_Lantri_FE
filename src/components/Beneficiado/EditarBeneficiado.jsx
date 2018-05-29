import React, { Component } from 'react';
import FileBase64 from '../Helpers/FileBase64';
import '../../styles/CrearFundacion.css';
import WebApiService from '../Service/WebApiService';
import swal from 'sweetalert2'
import { FormControl } from "react-bootstrap"
import { connect } from 'react-redux';
import { FormErrors } from "../Helpers/FormErrors.js"

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

class EditarBenefidiado extends Component {
  constructor(props) {
    super(props);
    const urlParams = new URLSearchParams(this.props.location.search)
    const benid = urlParams.get('Benid');
    this.state = {
      id: benid,
      name: "",
      age: "",
      preferences: "",
      file: "",
      newFile: "",
      formErrorsName: { name: '' },
      formErrorsAge: { age: '' },
      formErrorsPreferences: { preferences: '' },
      nameValid: false,
      ageValid: false,
      preferencesValid: false,
      formValid: false,
      buttonDisabled: false,
      isLoading: true
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getFiles = this.getFiles.bind(this);

  }
  componentWillMount() {
    var data = {
      'direction': '/benefiteds/',
      'param': this.state.id,
    }
    WebApiService.Get(data).then(res => {
      this.setState({
        name: res.name, age: res.age, preferences: res.preferences, file: res.avatar.url, nameValid: true, ageValid: true, formValid: true
      });
      this.setState({
        isLoading: false
      });
    });
    this.validateForm()
  }

  handleTagChange(tags) {
    this.setState({ tags })
  }

  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }
  validateField(fieldName, value) {
    var er1 = new RegExp("[></'" + '"]');
    let formErrorsName = this.state.formErrorsName;
    let formErrorsPreferences = this.state.formErrorsPreferences;
    let formErrorsAge = this.state.formErrorsAge;
    let nameValid = this.state.nameValid;
    let ageValid = this.state.ageValid;
    let preferencesValid = this.state.preferencesValid;


    switch (fieldName) {
      case 'name':
        if (value.match(er1)) {
          nameValid = false;
        } else {
          nameValid = value.length >= 1;
        }
        formErrorsName.name = nameValid ? '' : ' es vacío o' + " Contiene un caracter invalido (< > ' " + ' " /)';
        break;
      case 'age':
        if (value.match(er1)) {
          ageValid = false;
        } else {
          ageValid = value.length >= 1;
        }
        formErrorsAge.age = ageValid ? '' : ' es vacía o' + " Contiene un caracter invalido (< > ' " + ' " /)';
        break;
      case 'preferences':
        if (value.match(er1)) {
          preferencesValid = false;
        } else {
          preferencesValid = true;
        }
        formErrorsPreferences.preferences = preferencesValid ? '' : " Contiene un caracter invalido (< > ' " + ' " /)';
        break;
      default:
        break;
    }
    this.setState({
      nameValid: nameValid,
      ageValid: ageValid,
      preferencesValid: preferencesValid,
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.nameValid && this.state.ageValid && this.state.preferencesValid});
  }

  getFiles(file) {
    this.setState({ newFile: file });
  }

  handleSubmit(event) {
    this.setState({ buttonDisabled: true });
    var data = {
      'direction': 'benefiteds/',
      'param': this.state.id,
      'body': { "benefited": { "name": this.state.name, "age": this.state.age, "preferences": this.state.preferences, "avatar": this.state.newFile.base64 } },
      'type': 1,
      'headers': { 'X-Director-Email': this.props.user.email, 'X-Director-Token': this.props.user.token, 'Content-Type': 'application/json' }
    }
    WebApiService.Patch(data).then(res => {
      this.setState({ buttonDisabled: false });
      //console.log(res);
      res.json().then(result => {
        //console.log(result);
      });
      if (res.status === 200) {
        this.props.history.push("/perfil");
        swal(
          'Exito',
          'Beneficiado modificado exitosamente',
          'success'
        )
      } else {
        swal(
          'Error',
          'Problema al actualizar',
          'error'
        )
      }
    });
    event.preventDefault();
  }

  render() {
    const preview = (this.state.newFile !== "" ? <img src={this.state.newFile.base64} height="180" width="210" alt="preview" /> : "");
    return (
      <div>
        <form className="caja" onSubmit={this.handleSubmit}>
          <h1 className="title">Editar Beneficiado</h1>
          <img src={WebApiService.baseUrl + this.state.file} alt="Logo" height="220" width="260" />
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
            <FormControl componentClass="textarea" name="preferences" placeholder="Preferencias"
              value={this.state.preferences}
              onChange={this.handleUserInput} />
          </div>
          <div>
            <FormErrors formErrors={this.state.formErrorsPreferences} />
          </div>
          <div className="form-group">
            <label>Imagen</label>
            <FileBase64 onDone={this.getFiles} />
            <div className="preview text-center">
              {preview}
            </div>
          </div>
          <button type="submit" className="btn btn-success" disabled={!this.state.formValid || this.state.buttonDisabled}>Actualizar beneficiario</button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(EditarBenefidiado)