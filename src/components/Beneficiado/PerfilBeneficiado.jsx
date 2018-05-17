import React, { Component } from 'react';
import WebApiService from '../Service/WebApiService';
import "../../styles/perfilBeneficiado.css";
import {Button } from "react-bootstrap";
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
      isLoading: true
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
    var data = {//Director
      'direction': 'directors',
      'param': '',
      'body': { "director": { "email": this.state.email, "password": this.state.password, "user": this.state.user, "name": this.state.name, "lastname": this.state.lastname, "phone": this.state.phone, "bio": this.state.biodes } },
    }
    WebApiService.Post(data).then(res => {
      //this.props.HideLoader();
      this.setState({ buttonDisabled: false });

      if (res.status === 201) {
        this.props.ShowAlert("Vinculo creado satisfactoriamente", "success");
      } else {
        this.props.ShowAlert("Problema al apadrinar", "danger");
      }
    });
  }
  mostrarBoton(){
    if(this.props.user.userType===false){
      return<Button className = "center" bsStyle="success" /*onClick={(e) => this.apadrinar()}*/>Apadrinar</Button>
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