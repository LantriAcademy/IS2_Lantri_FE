import React, { Component } from 'react';
import { Button, Grid, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/Fundacion.css";
import WebApiService from '../Service/WebApiService';
import ListaBeneficiados from '../Fundacion/ListaBeneficiados'
import { connect } from 'react-redux';
import EventosSuscrito from './EventosSuscrito'
import Apadrinados from './Apadrinados'
import Actualizar from './Actualizar'
import EventSus from '../Charts/EventSus';
import Inicio from './Inicio';

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

class Perfil extends Component {

  constructor(props) {
    super(props)

    this.state = {
      usuario: {},
      biodes: "",
      isLoading: true
    }
  }
  irFundacion(){
    window.open('/fundaciones/'+this.state.usuario.foundation_id);
  }
    crearFundacion(){
    window.location = "/crearFundacion";
  }
  
  menuFundacion(selection){
    if(selection ===1){
               if(this.state.usuario.foundation_id !== null){
    return <button type="submit" onClick={(e) => this.irFundacion()} className="btn btn-success" >Ir a mi fundación</button>
    } 
    }else if (selection === 2){
         if(this.state.usuario.foundation_id === null){
      return <li><a data-toggle="tab" href=" " onClick={(e) => this.crearFundacion()}>Crear una fundación</a></li>
    }else{
      return <li><a data-toggle="tab" href="#fundacion">Actualizar informacion de mi fundación</a></li>
    }
    }else if(selection ===3){
        if(this.state.usuario.foundation_id !== null){
      return <Actualizar foundation_id={this.state.usuario.foundation_id} fundacion={true} director={true} id={this.props.user.id} email={this.props.user.email} token={this.props.user.token} />
    }}

  }
  componentWillMount() {
    this.props.ShowLoader();
    if (this.props.user.userType === true) {
      var data = {
        'direction': 'directors/',
        'param': this.props.user.id,
        'type': 1,
        'headers': { 'X-Director-Email': this.props.user.email, 'X-Director-Token': this.props.user.token }
      }
    } else {
      var data = {
        'direction': 'contributors/',
        'param': this.props.user.id,
        'type': 1,
        'headers': { 'X-Contributor-Email': this.props.user.email, 'X-Contributor-Token': this.props.user.token }
      }
    }
    WebApiService.GetAuthenticated(data).then(res => {
      this.setState({
        usuario: res,
      });
      this.props.HideLoader();
      this.setState({ isLoading: false });
    });

  }

  render() {
    if (this.state.isLoading) {
      return <div></div>
    } else {
      if (this.props.user.userType === true) {
        return (
          <div>
            <Grid>
              <Row className="show-grid principal">
                <Col sm={3}>
                  <img src={WebApiService.baseUrl + this.state.usuario.avatar.url} alt="Logo" height="220" width="260" />
                  <ul className="nav nav-pills  nav-stacked menu">
                    <li className="active"><a data-toggle="tab" href="#inicio">Inicio</a></li>
                    <li><a data-toggle="tab" href="#actualizar">Actualizar información Personal</a></li>
                    {this.menuFundacion(2)}
                  </ul>
                </Col>
                <Col sm={9}>
                  <div className="tab-content">
                    <div id="inicio" className="tab-pane fade in active">
                    <Inicio  biodes = {this.state.usuario.bio}  usuario={this.state.usuario} />
                      <br/>
{this.menuFundacion(1)}
                  </div>
                    <div id="beneficiados" className="tab-pane fade">
                    </div>
                    <div id="estadisticas" className="tab-pane fade text-center">
                    </div>
                    <div id="fundacion" className="tab-pane fade">
                    {this.menuFundacion(3)}
                    </div>
                    <div id="actualizar" className="tab-pane fade">
                      <Actualizar fundacion={false} director={true} id={this.props.user.id} email={this.props.user.email} token={this.props.user.token} />
                    </div>
                  </div>
                </Col>
              </Row>
            </Grid>
          </div>
        );
      } else {
        return (
          <div>
            <Grid>
              <Row className="show-grid principal">
                <Col sm={3}>
                  <img src={WebApiService.baseUrl + this.state.usuario.avatar.url} alt="Logo" height="220" width="260" />
                  <ul className="nav nav-pills  nav-stacked menu">
                    <li className="active"><a data-toggle="tab" href="#inicio">Inicio</a></li>
                    {/*<li><a data-toggle="tab" href="#beneficiados">Apadrinados</a></li>*/}
                    <li><a data-toggle="tab" href="#estadisticas">Estadísticas</a></li>
                    <li><a data-toggle="tab" href="#eventos">Eventos suscrito</a></li>
                    <li><a data-toggle="tab" href="#actualizar">Actualizar información</a></li>
                  </ul>
                </Col>
                <Col sm={9}>
                  <div className="tab-content">
                    <div id="inicio" className="tab-pane fade in active">
                    <Inicio  biodes = {this.state.usuario.description} usuario={this.state.usuario} />
                  </div>
                    <div id="beneficiados" className="tab-pane fade">
                      {/*<Apadrinados contributor_id={this.props.user.id}/>*/}
                    </div>
                    <div id="estadisticas" className="tab-pane fade text-center">
                      <EventSus />
                    </div>
                    <div id="eventos" className="tab-pane fade">
                      <EventosSuscrito contributor_id={this.props.user.id} contributor_email={this.props.user.email} contributor_token={this.props.user.token} />
                    </div>
                    <div id="actualizar" className="tab-pane fade">
                      <Actualizar director={false} fundacion = {false} id={this.props.user.id} email={this.props.user.email} token={this.props.user.token} /></div>
                  </div>
                </Col>
              </Row>
            </Grid>
          </div>
        );
      }
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Perfil)
