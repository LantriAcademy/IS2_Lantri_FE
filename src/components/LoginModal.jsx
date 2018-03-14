import React from 'react';
import { Link } from "react-router-dom";
import { Modal, Col} from 'react-bootstrap';
import "../styles/LoginModal.css";

class LoginModal extends React.Component {

  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.hide} bsSize="small">
          <Modal.Header closeButton>
            <Modal.Title bsClass="text-center">
               Inicio de sesión 
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form className="login">
              <div className="form-group">
                <label>Correo Electronico</label>
                <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Correo Electronico" />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input type="password" className="form-control" id="password" placeholder="Contraseña" />
              </div>
              <button type="submit" className="btn btn-success  btn-block ">Iniciar Sesion</button>
              <p>¿No tienes cuenta?  <Link to="/signup" onClick={this.props.hide}>Registrarse</Link></p>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
export default LoginModal;