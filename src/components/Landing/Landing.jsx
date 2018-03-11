import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { Grid, Row, Col, Image, Button} from "react-bootstrap";
import InitialBanner from "./InitialBanner";
import "../../styles/landing.css"

export default class Landing extends Component {
    render() {
      return (
        <InitialBanner/>
      );
    }
  }
