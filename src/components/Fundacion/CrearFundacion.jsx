import React, { Component } from 'react';
import WebApiService from '../Service/WebApiService';
import FileBase64 from '../Helpers/FileBase64';
import '../../styles/CrearFundacion.css';
import { FormErrors } from "../Helpers/FormErrors.js"
import DraggableMap from './DraggableMap';
import swal from 'sweetalert2'
import { connect } from 'react-redux';
import TagInput from '../TagInput/TagInput';
import PDF from '../Helpers/PDFMismaPag';


const mapStateToProps = state => {
  return {
    user: state.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
    foundation: (foundationId) => dispatch({
      type: 'FoundationID', foundationId: foundationId
    })
  }
}

class CrearFundacion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      direction: "",
      imageFile: "",
      pdfFile: "",
      formErrorsName: { name: '' },
      formErrorsDirection: { direction: '' },
      nameValid: false,
      directionValid: false,
      lat: 4.637894,
      lng: -74.084023,
      tags: [],
      buttonDisabled: false,
      description: '',
      howToHelp: '',
      contactUs: '',
      formErrorscontactUs: { contactUs: '' },
      formErrorshowToHelp: { howToHelp: '' },
      formErrorsdescription: { description: '' },
      contactUsValid: false,
      howToHelpValid: false,
      descriptionValid: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.getimageFiles = this.getimageFiles.bind(this);
    this.getpdfFiles = this.getpdfFiles.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
  }
  handleTagChange(tags) {
    this.setState({ tags })
  }

  fileSelectedHandler = event => {
    //console.log(event.target.files[0]);
    this.setState({
      selectedFile: event.target.files[0]
    });
  }


  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }


  handleSubmit(event) {

    //console.log(this.state.file.base64);
    this.setState({ buttonDisabled: true });
    var data = {
      'direction': 'foundations',
      'param': '',
      'body': {
        "foundation": {
          "name": this.state.name, "direction": this.state.direction,
          "latitude": this.state.lat, "longitude": this.state.lng, "director_id": this.props.user.id, "avatar": this.state.imageFile.base64, "description": this.state.description, "howToHelp": this.state.howToHelp, "contactUs": this.state.contactUs
        }, "interest": this.state.tags
      },
      'type': 1,
      'headers': { 'X-Director-Email': this.props.user.email, 'X-Director-Token': this.props.user.token, 'Content-Type': 'application/json' }
    }
    WebApiService.Post(data).then(res => {
      this.setState({ buttonDisabled: false });
      if (res.status === 201) {
        res.json().then((result) => {
          this.props.foundation(result.id);
          //console.log("/fundaciones/"+result.id);
          this.props.history.push("/fundaciones/" + result.id);
        });
        swal(
          'Exito',
          'Fundación creada exitosamente',
          'success'
        )
      } else {
        //alert("Error al crear intentalo de nuevo");
        swal(
          'Error',
          'Asegurese de no haber usado caracteres especiales como ñ o espacios en el nombre',
          'error'
        )
      }
    });
    event.preventDefault();
  }

  getimageFiles(image) {
    this.setState({ imageFile: image });
  }

  getpdfFiles(pdf) {
    this.setState({ pdfFile: pdf });
  }

  showPDF(props) {
    if (this.state.pdfFile !== "") {
      return <PDF base64={this.state.pdfFile.base64} />
    } else {
      return <PDF url={"http://localhost:3000/events_pdf/4"} />
    }
  }

  onDragEnd(lat, lng) {
    this.setState({ lat: lat, lng: lng });
  }

  validateField(fieldName, value) {
    let formErrorsName = this.state.formErrorsName;
    let formErrorsDirection = this.state.formErrorsDirection;
    let formErrorshowToHelp = this.state.formErrorshowToHelp;
    let formErrorscontactUs = this.state.formErrorscontactUs;
    let formErrorsdescription = this.state.formErrorsdescription;
    let nameValid = this.state.nameValid;
    let directionValid = this.state.directionValid;
    let descriptionValid = this.state.descriptionValid;
    let howToHelpValid = this.state.howToHelpValid;
    let contactUsValid = this.state.contactUsValid;

    switch (fieldName) {
      case 'name':
        nameValid = value.length >= 2;
        formErrorsName.name = nameValid ? '' : ' es obligatorio.';
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
      nameValid: nameValid,
      directionValid: directionValid,
      descriptionValid: descriptionValid,
      howToHelpValid: howToHelpValid,
      contactUsValid: contactUsValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.nameValid && this.state.directionValid && this.state.descriptionValid && this.state.howToHelpValid && this.state.contactUsValid });
  }

  render() {
    const previewImage = (this.state.imageFile !== "" ? <img src={this.state.imageFile.base64} height="180" width="210" alt="Preview" /> : "");
    return (
      <div>
        <form className="caja" onSubmit={this.handleSubmit}>
          <h1 className="title">Crear f<b>UN</b>dacion</h1>
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
            <label>Preferencias</label>
            <TagInput UpdateTagsParent={this.handleTagChange} />
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
          <div className="form-group">
            <label>Imagen</label>
            <FileBase64 onDone={this.getimageFiles} />
            <div className="preview text-center">
              {previewImage}
            </div>
          </div>
          <div className="form-group">
            <label>Suba el documento que comprueba la existencia de su fundación (solo formato PDF)</label>
            <FileBase64 onDone={this.getpdfFiles} />
            {/*this.showPDF()*/}
          </div>
          <button type="submit" className="btn btn-success" disabled={!this.state.formValid || this.state.buttonDisabled}>Crear Fundación</button>
        </form>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CrearFundacion)