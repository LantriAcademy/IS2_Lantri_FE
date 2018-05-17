import React, { Component } from 'react';
import WebApiService from '../Service/WebApiService';
import "../../styles/perfilBeneficiado.css";

export default class PerfilBeneficiado extends Component {
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

  componentDidMount() {
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
  render() {
    if (this.state.isLoading) {
      return <div />
    } else {
      return (
        <div>
          <br />
          <h1 className="text-center">Gracias por venir</h1>
          <h2 className="text-center">Este soy yo</h2>
          <img src={WebApiService.baseUrl + this.state.beneficiado.avatar.url} class = "center" alt="foto" height="300" width="260" />
          <br />

          <div className="panel panel-success text-center">
            <div className="panel-heading">
              <h3 className="panel-title"> <h2>Dejame contarte sobre mi</h2></h3>
            </div>
            <div className="panel-body">
              <h5> Mi nombre es {this.state.beneficiado.name}</h5>
              <h5> Tengo {this.state.beneficiado.age} años</h5>
              <h5> Me gusta: {this.state.beneficiado.preferences}</h5>
            </div> </div>
        </div>
      );
    }
  }
}
