import React, { Component } from 'react';
import {Link} from "react-router-dom";
import {Jumbotron , Grid, Row, Col, Image, Button} from "react-bootstrap";
import "../styles/landing.css"

export default class Landing extends Component {
    render() {
      return (
        <Grid>
            <Jumbotron>
                <h1 className = "title">fUNdaciones</h1>
                <p>La info supongo :v</p>
            </Jumbotron>
        </Grid>
      );
    }
  }
