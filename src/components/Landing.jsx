import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { Grid, Row, Col, Image, Button} from "react-bootstrap";
import "../styles/landing.css"

export default class Landing extends Component {
    render() {
      return (
        <Grid>
            <h1 className = "title">fUNdaciones</h1>
        </Grid>
      );
    }
  }
