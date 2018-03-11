import React, { Component } from 'react';
import '../styles/Login.css';

class Login extends Component {
    render() {
      return (
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
              <p>¿No tienes cuenta?  <a href="#">Registrarse</a></p>
          </form>
        </div>
      );
    }
  }
  
  export default Login;