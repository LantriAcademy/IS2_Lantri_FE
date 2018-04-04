import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail, Button} from "react-bootstrap";
import fundacion1 from '../../assets/fundacion1.jpg'
import fundacion2 from '../../assets/fundacion2.jpg'
import fundacion4 from '../../assets/fundacion4.png'
import "../../styles/Slider.css"

export default class Slider extends Component {
    render() {
      return (
        <Grid className="slide-f">
          <Row>
            <Col xs={6} md={4}>
              <Thumbnail src={fundacion1} alt="242x200">
                <h3>Fundacion 1</h3>
                <p>Description</p>
                <p>
                  <Button bsStyle="success">Ver mas</Button>&nbsp;
                </p>
              </Thumbnail>
            </Col>
            <Col xs={6} md={4}>
              <Thumbnail src={fundacion2} alt="242x200">
                <h3>Fundacion 2</h3>
                <p>Description</p>
                <p>
                  <Button bsStyle="success">Ver mas</Button>&nbsp;
                </p>
              </Thumbnail>
            </Col>
            <Col xs={6} md={4}>
              <Thumbnail src={fundacion4} alt="242x200">
                <h3>Fundacion 3</h3>
                <p>Description</p>
                <p>
                  <Button bsStyle="success">Ver mas</Button>&nbsp;
                </p>
              </Thumbnail>
            </Col>
          </Row>
        </Grid>
      );
    }
  }
