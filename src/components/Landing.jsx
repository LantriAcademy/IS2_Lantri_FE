import React, { Component } from 'react';
import {Link} from "react-router-dom";
import { Grid, Row, Col, Image} from "react-bootstrap";
import "../styles/landing.css"
import niños from '../assets/niños.jpg'
import InitialBanner from "./InitialBanner";
import Slider from "./Slider";

export default class Landing extends Component {
    render() {
      return (
        <div>
          <InitialBanner/>
          <Slider />
        {/*<Grid className="afterBanner">
          <Row className="show-grid">
            <Col sm={6} md={6} lg={6}>
              <div className="container-fluid">
                <form>
                  <h1 className="center">f<b>UN</b>daciones</h1>
                  <h2>Con tu apoyo podremos alcanzar los objetivos y hacer que los niños tengan 
                    un mejor hogar, sean mas felices y que puedan sonreir diariamente.</h2>
                    <Image src = {niños} responsive />
                </form>
              </div>
            </Col>
            <Col sm={6} md={6} lg={6}>
            <div className="container-fluid">
              <form className="login">
                <h1 className="title">Ingresa a f<b>UN</b>daciones</h1>
                <div className="form-group">
                  <label>Correo Electronico</label>
                  <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Correo Electronico"/>
                </div>
                <div className="form-group">
                  <label>Contraseña</label>
                  <input type="password" className="form-control" id="password" placeholder="Contraseña"/>
                </div>
                  <button type="submit" className="btn btn-success">Iniciar Sesion</button>
                  <p>¿No tienes cuenta?  <Link to="/signup">Registrarse</Link></p>
              </form>
            </div>
            </Col>
          </Row>
        </Grid>*/}
        </div>
      );
    }
  }
