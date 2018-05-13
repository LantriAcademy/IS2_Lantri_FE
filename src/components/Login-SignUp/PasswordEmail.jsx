import React, { Component } from 'react'
import { Panel, FormControl, ControlLabel, FormGroup } from 'react-bootstrap'
import '../../styles/resetPassword.css'
import { FormErrors } from "../Helpers/FormErrors.js"
import swal from 'sweetalert2'
import WebApiService from '../Service/WebApiService'



export default class PasswordEmail extends Component {

    constructor(props) {
        super(props);

        this.validFields = this.validFields.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            email: '',
            formErrorsEmail: { email: '' },
            formValid: false,
        };
    }
    handleSubmit(e) {
        var data = {
            'direction': 'contributor/reset_password',
            'param': '?email=' + this.state.email,
            'body': '',
        }
        this.setState({ email: '', formValid: false });
        WebApiService.PostParamURL(data).then(res => {  
            if (res.status === 200) {
                res.json().then((result) => {
                    this.props.history.push("/");
                });
                swal(
                    'Revisa tu buzón de correo',
                    'Se ha enviado un correo electrónico para que puedas reestablecer tu contraseña',
                    'success'
                );
            } else {
                swal(
                    'Error',
                    'No hemos podido enviar un correo, intente más tarde',
                    'error'
                );
            }
        });
    }
    validFields(e) {
        this.setState({ email: e.target.value });
        let formErrorsEmail = this.state.formErrorsEmail;
        var emailValid = e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        if (emailValid) {
            formErrorsEmail.email = '';
            this.setState({ formValid: true });
        } else {
            this.setState({ formValid: false });
            formErrorsEmail.email = 'escriba un correo electrónico válido';
        }
    }
    render() {
        return <div className="container resetPassword">
            <Panel bsStyle="success" className="panelReset">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">¿Olvidaste tu contraseña?</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <p style={{textAlign: "center", fontSize:"12px"}}>Te enviaremos un correo para que puedas hacer el cambio de la contraseña</p>
                    <br/>
                    <FormGroup>
                        <ControlLabel>Correo Electrónico</ControlLabel>
                        <input type="email" className="form-control" name="email"
                            placeholder="Correo Electrónico"
                            value={this.state.email}
                            onChange={this.validFields} />
                    </FormGroup>
                    <div>
                        <FormErrors formErrors={this.state.formErrorsEmail} />
                    </div>
                    <button className="btn btn-success" onClick={this.handleSubmit} disabled={!this.state.formValid}>Enviar</button>
                </Panel.Body>
            </Panel>
        </div>
    }
}