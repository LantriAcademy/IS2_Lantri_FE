import React, { Component } from 'react';
import '../styles/SignUp.css';
import{FormControl, FormGroup, ControlLabel} from "react-bootstrap"

class SignUp extends Component {
    render() {
      return (
        <div className="caja" >
          <form className="login">
            <h1 className="title">Registrate en f<b>UN</b>daciones</h1>
            <FormGroup>
              <ControlLabel>Nombre Completo</ControlLabel>
              <input type="name" className="form-control" id="name" placeholder="Nombre"/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Correo Electronico</ControlLabel>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Correo Electronico"/>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Contraseña</ControlLabel>
              <input type="password" className="form-control" id="password" placeholder="Contraseña"/>
            </FormGroup>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Tipo de usuario</ControlLabel>
              <FormControl componentClass="select" placeholder="select">
                <option value="usuario">Padrino</option>
                <option value="fundacion">Fundacion</option>
              </FormControl>
            </FormGroup>
              <button type="submit" className="btn btn-success">Registrarse</button>
          </form>
        </div>
      );
    }
  }
  
  export default SignUp;