import React, { Component } from 'react';
import { Grid, Row, Col} from "react-bootstrap";
import fundacion1 from '../../assets/fundacion1.jpg'
import "../../styles/Fundacion.css";
import WebApiService from '../Service/WebApiService';
import Mapa from './Mapa';

export default class Fundacion extends Component {
  constructor(props){
    super(props)
    this.state = {
      fundacion : {},
      isLoading: false,
    }
  }

  componentDidMount(){
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
      return <p>Loading ...</p>;
    }

    return (
    <div>
      <Grid>
        <Row className="show-grid principal">
          <Col sm={3}>
            <img src={fundacion1} alt="242x200" height="200" width="242"/>
            <ul className="nav nav-pills  nav-stacked menu">
              <li className="active"><a data-toggle="tab" href="#inicio">Inicio</a></li>
              <li><a data-toggle="tab" href="#niños">Niños</a></li>
              <li><a data-toggle="tab" href="#comoAyudarnos">Como Ayudarnos</a></li>
              <li><a data-toggle="tab" href="#quienesSomos">Quienes Somos</a></li>
              <li><a data-toggle="tab" href="#conctactenos">Conctactenos</a></li>
            </ul>
          </Col>
          <Col sm={9}>
            <div className="tab-content">
              <div id="inicio" className="tab-pane fade in active">
                <h1 className="text-center">Bienvenido a {fundacion.name}</h1>
                <p className="text-center"><strong>Dirección: </strong>{fundacion.direction}</p>
                <Mapa defaultCenter={{lat: parseFloat(fundacion.latitude) , lng: parseFloat(fundacion.longitude)}}/>
              </div>
              <div id="niños" className="tab-pane fade">niños</div>
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
