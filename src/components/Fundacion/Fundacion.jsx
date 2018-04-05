import React, { Component } from 'react';
import { Grid, Row, Col} from "react-bootstrap";
import fundacion1 from '../../assets/fundacion1.jpg'
import "../../styles/Fundacion.css";
import WebApiService from '../Service/WebApiService';
import Inicio from './Inicio'
import ListaBeneficiados from './ListaBeneficiados'

export default class Fundacion extends Component {
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
              <li><a data-toggle="tab" href="#comoAyudarnos">Como Ayudarnos</a></li>
              <li><a data-toggle="tab" href="#quienesSomos">Quienes Somos</a></li>
              <li><a data-toggle="tab" href="#conctactenos">Conctactenos</a></li>
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
