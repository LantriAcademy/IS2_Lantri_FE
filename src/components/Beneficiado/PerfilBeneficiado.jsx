import React, { Component } from 'react';
import WebApiService from '../Service/WebApiService';
import "../../styles/perfilBeneficiado.css";
import {Button } from "react-bootstrap";
import { connect } from 'react-redux';
import swal from 'sweetalert2'

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
  }
}
class PerfilBeneficiado extends Component {
  constructor(props) {
    super(props)
    const urlParams = new URLSearchParams(this.props.location.search)
    const benid = urlParams.get('Benid');
    this.state = {
      beneficiado: {},
      Benid: benid,
      isLoading: true,
      buttonDisabled: false,
    }
  }

  componentWillMount() {
    var data = {
      'direction': '/benefiteds/',
      'param': this.state.Benid,
    }
    WebApiService.Get(data).then(res => {
      this.setState({
        beneficiado: res
      });
      this.setState({
        isLoading: false
      });
    });
  }

  apadrinar(){
   /* var data = {
      'direction': 'directors',
      'param': '',
      'body': { "director": { "email": this.state.email, "password": this.state.password, "user": this.state.user, "name": this.state.name, "lastname": this.state.lastname, "phone": this.state.phone, "bio": this.state.biodes } },
    }
    WebApiService.Post(data).then(res => {
      this.setState({ buttonDisabled: false });

      if (res.status === 201) {
        this.props.ShowAlert("Vinculo creado satisfactoriamente", "success");
      } else {
        this.props.ShowAlert("Problema al apadrinar", "danger");
      }*/
    this.setState({buttonDisabled: true});
    var data = {
      'direction': 'helps',
      'param' : '',
      'body' : { "help": {"contributor_id": this.props.user.id, "benefited_id": Number(this.state.Benid)} },  
      'type' : 1,
      'headers': {'X-Contributor-Email': this.props.user.email, 'X-Contributor-Token': this.props.user.token,'Content-Type': 'application/json' }
    }
    
    WebApiService.Post(data).then(res =>{
      this.setState({buttonDisabled: false});
      res.json().then(result => {
        if (res.status === 201) {
          swal(
            'Exito',
            'Gracias por tu ayudo',
            'success'
          )
        } else {
          swal(
            'Error',
             result.Error,
            'error'
          )
        }
      });
    });
  }
  mostrarBoton(){
    if(this.props.user.userType===false){
      return<Button className = "center" bsStyle="success" disabled={this.state.buttonDisabled} onClick={(e) => this.apadrinar()}>Apadrinar</Button>
    }else{

    }
  }
  render() {
    if (this.state.isLoading) {
      return <div />
    } else {
      return (
        <div>
          <br />
          <h1 className="text-center">Gracias por venir</h1>
          <h2 className="text-center">Este soy yo</h2>
          <img src={WebApiService.baseUrl + this.state.beneficiado.avatar.url} className="center" alt="foto" height="300" width="260" />
          <br />

          <div className="panel panel-success text-center">
            <div className="panel-heading">
              <div className="panel-title"><h2>Dejame contarte sobre mi</h2></div>
            </div>
            <div className="panel-body">
              <h5> Mi nombre es {this.state.beneficiado.name}</h5>
              <h5> Tengo {this.state.beneficiado.age} años</h5>
              <h5> Me gusta: {this.state.beneficiado.preferences}</h5>
            </div>
          </div>
          {this.mostrarBoton()}
          

        </div>
      );
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PerfilBeneficiado)