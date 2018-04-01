import React, { Component } from 'react';
import fetch from 'node-fetch'
import { Link } from "react-router-dom";
import { Grid, Row, Col, Thumbnail, Button} from "react-bootstrap";

import fundacion1 from '../assets/fundacion1.jpg'


export default class Fundaciones extends Component {
  constructor(props){
    super(props)
    this.state = {
      fundaciones : []
    }
  }

  componentWillMount(){
    fetch('http://localhost:3000/foundations')
    .then(res => res.json())
    .then(res => 
      this.setState({
        fundaciones : res 
      })
    );
  }
    
  render() {
    const todoFundaciones = this.state.fundaciones.map((fundacion, index) => {
      var route = "/fundaciones/" + fundacion.id;
        return(
          <Col key={index} xs={6} md={4}>
            <Thumbnail src={fundacion1} alt="242x200">
              <h3>{fundacion.name}</h3>
              <p>{fundacion.direction}</p>
              <p><Button bsStyle="success" componentClass={Link} href={route} to={route}>Ver mas</Button></p>
            </Thumbnail>
          </Col>
        );
      }
    )

    return (
      <div>
        <Grid className="slide-f">
          <Row>
            <Col xs={2}>
              {/*Filtros*/}
            </Col>
            <Col xs={10}>
              <h1 class="text-center">Lista de fundaciones</h1>
              {todoFundaciones}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
