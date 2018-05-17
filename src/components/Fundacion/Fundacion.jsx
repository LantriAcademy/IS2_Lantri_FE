import React, { Component } from 'react';
import { Button, Grid, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../styles/Fundacion.css";
import WebApiService from '../Service/WebApiService';
import Inicio from './Inicio'
import ComoLlegar from './ComoLlegar'
import ListaBeneficiados from './ListaBeneficiados'
import { connect } from 'react-redux';
import ListaEventos from './ListaEventos';
import EdadBenef from '../Charts/EdadBenef';
import EventFun from '../Charts/EventFun';

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
class Fundacion extends Component {

  constructor(props) {
    super(props)

    this.state = {
      fundacion: {},
      pdfUrl: "1",
      isLoading: true
    }
  }
  componentWillMount() {
    this.props.ShowLoader();
    var data = {
      'direction': 'foundations/',
      'param': this.props.match.params.id
    }
    WebApiService.Get(data).then(res => {
      this.setState({
        fundacion: res,
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
                <img src={WebApiService.baseUrl + this.state.fundacion.avatar.url} alt="Logo" height="220" width="260" />
                <ul className="nav nav-pills  nav-stacked menu">
                  <li className="active"><a data-toggle="tab" href="#inicio">Inicio</a></li>
                  <li><a data-toggle="tab" href="#beneficiados">Beneficiados</a></li>
                  <li><a data-toggle="tab" href="#eventos">Eventos</a></li>
                  <li><a data-toggle="tab" href="#estadisticas">Estadisticas</a></li>
                  <li><a data-toggle="tab" href="#comoLlegar">Como Llegar</a></li>
                  {(this.props.user.foundationId !== "" && this.props.user.foundationId === Number(this.props.match.params.id)) &&
                    <div className="text-center">
                      <Button className="btn btn-success btn-block" componentClass={Link} href="/crearEvento" to="/crearEvento">Crear Evento</Button>
                      <Button className="btn btn-success btn-block" componentClass={Link} href="/crearBeneficiado" to="/crearBeneficiado">Crear Beneficiado</Button>
                    </div>
                  }
                </ul>
              </Col>
              <Col sm={9}>
                <div className="tab-content">
                  <div id="inicio" className="tab-pane fade in active">
                    <Inicio fundacion={this.state.fundacion} />
                  </div>
                  <div id="beneficiados" className="tab-pane fade">
                    <ListaBeneficiados fundacion_id={this.props.match.params.id} />
                  </div>
                  <div id="eventos" className="tab-pane fade">
                    <ListaEventos fundacion_id={this.props.match.params.id} />
                  </div>
                  <div id="estadisticas" className="tab-pane fade text-center">
                    <EdadBenef fundacion_id={this.props.match.params.id} />
                    <EventFun fundacion_id={this.props.match.params.id} />
                  </div>
                  <div id="comoLlegar" className="tab-pane fade">
                    <ComoLlegar fundacion={this.state.fundacion} />
                  </div>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      );
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Fundacion)
