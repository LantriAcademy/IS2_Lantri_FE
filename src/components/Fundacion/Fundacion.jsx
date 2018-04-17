import React, { Component } from 'react';
import { Button, Grid, Row, Col} from "react-bootstrap";
import { Link } from "react-router-dom";
import fundacion1 from '../../assets/fundacion1.jpg'
import "../../styles/Fundacion.css";
import WebApiService from '../Service/WebApiService';
import Inicio from './Inicio'
import ListaBeneficiados from './ListaBeneficiados'
import {connect} from 'react-redux';
import ListaEventos from './ListaEventos'

const mapStateToProps = state => {
  return {
    user : state.user
  }
}
class Fundacion extends Component {
  
  constructor(props){
    super(props)
    
    this.state = {
      fundacion : {},
      isLoading: false,
    }
  }

  componentWillMount(){
    this.setState({ isLoading: true });

    var data = {
      'direction': 'foundations/',
      'param' : this.props.match.params.id
    }
    WebApiService.Get(data).then(res =>{
      this.setState({
        fundacion: res,
        isLoading: false
      });
    });
  }

  render() {
    const {fundacion, isLoading} = this.state;

    if (isLoading) {
      return <p className="text-center">Loading ...</p>;
      ///*LOADING HERE*/
    }

    return (
    <div>
      <Grid>
        <Row className="show-grid principal">
          <Col sm={3}>
            <img src={fundacion1} alt="Logo" height="220" width="260"/>
            <ul className="nav nav-pills  nav-stacked menu">
              <li className="active"><a data-toggle="tab" href="#inicio">Inicio</a></li>
              <li><a data-toggle="tab" href="#beneficiados">Beneficiados</a></li>
              <li><a data-toggle="tab" href="#eventos">Eventos</a></li>
              <li><a data-toggle="tab" href="#comoAyudarnos">Como Ayudarnos</a></li>
              <li><a data-toggle="tab" href="#quienesSomos">Quienes Somos</a></li>
              <li><a data-toggle="tab" href="#conctactenos">Conctactenos</a></li>
              {(this.props.user.foundationId != "" && this.props.user.foundationId == this.props.match.params.id)  &&
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
                <Inicio fundacion={fundacion}/>
              </div>
              <div id="beneficiados" className="tab-pane fade">
                <ListaBeneficiados fundacion_id={this.props.match.params.id}/>
              </div>
              <div id="eventos" className="tab-pane fade">
                <ListaEventos fundacion_id={this.props.match.params.id}/>
              </div>
              <div id="comoAyudarnos" className="tab-pane fade">comoAyudarnos</div>
              <div id="quienesSomos" className="tab-pane fade">quienesSomos</div>
              <div id="conctactenos" className="tab-pane fade">conctactenos</div>
            </div>
          </Col>
        </Row>
      </Grid>
    </div>
    );
  }
}
export default connect(mapStateToProps)(Fundacion)
