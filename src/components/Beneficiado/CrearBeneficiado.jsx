import React, { Component } from 'react';
import FileBase64 from '../Helpers/FileBase64';
import '../../styles/CrearFundacion.css';
import WebApiService from '../Service/WebApiService';
import swal from 'sweetalert2'
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    user : state.user
  }
}

class CrearBeneficiado extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      age: "",
      preferences: "",
      file: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getFiles = this.getFiles.bind(this);
  }

  handleChange(state, e) {
    this.setState({[state]: e.target.value});
  }

  getFiles(file){
    this.setState({file: file});
  }

  handleSubmit(event) {
    var data = {
      'direction': 'benefiteds',
      'param' : '',
      'body' : {"benefited": {"foundation_id": this.props.user.foundationId, "name": this.state.name, "age": this.state.age, "preferences": this.state.preferences}},
      'type' : 1,
      'headers': {'X-Director-Email': this.props.user.email, 'X-Director-Token': this.props.user.token,'Content-Type': 'application/json' }
    }
    WebApiService.Post(data).then(res =>{
      console.log(res);
       res.json().then(result => {
          console.log(result);
        });
      if (res.status === 201) {
        swal(
          'Exito',
          'Beneficiado creado exitosamente',
          'success'
        )
      } else {
        swal(
          'Error',
          'Asegurese de no haber usado caracteres especiales como ñ o espacios en el nombre',
          'error'
        )
      }
    });
    event.preventDefault();
  }

  render() {
    const preview = (this.state.file !== "" ? <img src={this.state.file.base64} height="180" width="210" alt="preview"/> : "");
    return (
      <div>
        <form className="caja" onSubmit={this.handleSubmit}>
          <h1 className="title">Crear Beneficiado</h1>
          <div className="form-group">
            <label>Nombre</label>
            <input onChange={this.handleChange.bind(this, 'name')} type="text" className="form-control" placeholder="Nombre" required/>
          </div>
          <div className="form-group">
            <label>Edad</label>
            <input onChange={this.handleChange.bind(this, 'age')} type="number " className="form-control" placeholder="Edad"/>
          </div>
          <div className="form-group">
            <label>Preferencias</label>
            <textarea onChange={this.handleChange.bind(this, 'preferences')} type="text" className="form-control" placeholder="Preferencias"/>
          </div>
          <div className="form-group">
            <label>Imagen</label>
            <FileBase64 onDone={this.getFiles} />
            <div className="preview text-center">
              {preview}
            </div>
          </div>
          <button type="submit" className="btn btn-success btn-block">Crear Beneficiado</button>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps)(CrearBeneficiado)