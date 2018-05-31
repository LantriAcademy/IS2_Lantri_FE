import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail, Button} from "react-bootstrap";
import "../../styles/Slider.css"
import WebApiService from '../Service/WebApiService';
import { Link } from "react-router-dom";

export default class Slider extends Component {
  constructor(props){
    super(props)
    this.state = {
      fundaciones : []
    }
  }
    
  componentWillMount() {
    var data = {
      'direction': 'foundations/page/',
      'param' : '1',
    }
    WebApiService.Get(data).then(res =>{
      this.setState({
        fundaciones: res,
      });
    });
  }

  render() {
    const todoFundaciones = this.state.fundaciones.slice(0, 3).map((fundacion, index) => {
      var route = "/fundaciones/" + fundacion.id;
          return(
            <Col key={index} xs={6} md={4}>
              <Thumbnail>
                <img src={WebApiService.baseUrl + fundacion.avatar.url} alt="Logo" height="250" width="335" />
                <h3>{fundacion.name}</h3>
                <p>{fundacion.direction}</p>
                <p><Button bsStyle="success" componentClass={Link} href={route} to={route}>Ver mas</Button></p>
              </Thumbnail>
            </Col>
          );
      }
    )

    return (
      <Grid className="slide-f">
        <Row>
         {todoFundaciones}
        </Row>
      </Grid>
    );
  }
}
