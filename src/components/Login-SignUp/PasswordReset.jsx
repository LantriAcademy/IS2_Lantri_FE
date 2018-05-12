import React, { Component } from 'react';
import { Panel, FormControl, ControlLabel, FormGroup } from 'react-bootstrap';
import '../../styles/resetPassword.css'

import WebApiService from '../Service/WebApiService';



export default class PasswordReset extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            password2: ''
        }
    }
    
    render() {
        return <div className="container resetPassword">
            <Panel bsStyle="success" className="panelReset">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">Escribe tu nueva contraseña</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <FormGroup>
                        <ControlLabel>Correo Electrónico</ControlLabel>
                        <input type="email" className="form-control" name="email"
                            placeholder="Correo Electrónico"
                            value={this.state.email}
                            onChange={this.handleUserInput} />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Contraseña</ControlLabel>
                        <input type="password" className="form-control" name="password"
                            placeholder="Contraseña"
                            value={this.state.password}
                            onChange={this.handleUserInput} />
                    </FormGroup>
                    <FormGroup>
                        <ControlLabel>Confirme su contraseña</ControlLabel>
                        <input type="password" className="form-control" name="password2"
                            placeholder="Contraseña"
                            value={this.state.password2}
                            onChange={this.handleUserInput} />
                    </FormGroup>
                    <button  className="btn btn-success" >Cambiar</button>
                </Panel.Body>

            </Panel>
        </div>
    }
}