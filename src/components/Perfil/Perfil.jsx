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
      isLoading: true
    }
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
      this.setState({ isLoading: false });
    });
  }

  render() {
    if (this.state.isLoading) {
      return <div></div>
    } else {
      return (
        <div>
          <Grid>
            <Row className="show-grid principal">
              <Col sm={3}>
                <img src={WebApiService.baseUrl + this.state.usuario.avatar.url} alt="Logo" height="220" width="260" />
                <ul className="nav nav-pills  nav-stacked menu">
                  <li className="active"><a data-toggle="tab" href="#inicio">Inicio</a></li>
                  <li><a data-toggle="tab" href="#beneficiados">Apadrinados</a></li>
                  <li><a data-toggle="tab" href="#eventos">Eventos suscrito</a></li>
                  <li><a data-toggle="tab" href="#actualizar">Actualizar Información</a></li>
                </ul>
              </Col>
              <Col sm={9}>
                <div className="tab-content">
                  <div id="inicio" className="tab-pane fade in active">
                    Bienvenido contribuyente
                  </div>
                  <div id="beneficiados" className="tab-pane fade">
                    {/*<Apadrinados contributor_id={this.props.user.id}/>*/}
                  </div>
                  <div id="eventos" className="tab-pane fade">
                  <EventosSuscrito contributor_id={this.props.user.id} contributor_email={this.props.user.email} contributor_token={this.props.user.token}/>
                  </div>
                  <div id="actualizar" className="tab-pane fade">
                  <Actualizar/></div>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Perfil)
