import React, { Component } from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem} from "react-bootstrap";
import { Link } from "react-router-dom";
import fundacion1 from '../assets/fundacion1.jpg'
import "../styles/Fundacion.css";

export default class Fundacion extends Component {
  constructor(props){
    super(props)
    this.state = {
      fundacion : {}
    }
  }

  componentWillMount(){
    fetch('http://localhost:3000/foundations/' + this.props.match.params.id)
    .then(res => res.json())
    .then(res => 
      this.setState({
        fundacion : res 
      })
    );
  }

  render() {
    return (
    <div>
    <Grid>
      <Row className="show-grid principal">
        <Col sm={3}>
          <img src={fundacion1} alt="242x200" height="200" width="242"/>
          <ListGroup className="menu">
            <ListGroupItem>Inicio</ListGroupItem>
            <ListGroupItem>Niños</ListGroupItem>
            <ListGroupItem>Como Ayudarnos</ListGroupItem>
            <ListGroupItem>Quienes Somos</ListGroupItem>
            <ListGroupItem>Conctactenos</ListGroupItem>
          </ListGroup>  
        </Col>
        <Col sm={9}>
          <h1 className="text-center">Bienvenido a {this.state.fundacion.name}</h1>
          <p className="text-center">{this.state.fundacion.direction}</p>
        </Col>
      </Row>
    </Grid>
    </div>
    );
  }
}
