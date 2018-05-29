import React, { Component } from 'react'
import { ToggleButton, Panel, ControlLabel, FormGroup, ButtonToolbar, ToggleButtonGroup } from 'react-bootstrap'
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
            director: true
        };
    }
    handleSubmit(e) {
        var data;
        if (this.state.director) {
            data = {
                'direction': 'directors/reset_password',
                'param': '?email=' + this.state.email,
                'body': '',
            }
        } else {
            data = {
                'direction': 'contributors/reset_password',
                'param': '?email=' + this.state.email,
                'body': '',
            }
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
    handleSelectedChange(e) {
        this.setState({
            director: e,
        });
    }
    render() {
        return <div className="container resetPassword">
            <Panel bsStyle="success" className="panelReset">
                <Panel.Heading>
                    <Panel.Title componentClass="h3">¿Olvidaste tu contraseña?</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <p style={{ textAlign: "center", fontSize: "12px" }}>Te enviaremos un correo para que puedas hacer el cambio de la contraseña</p>
                    <br />
                    <ControlLabel>Tipo de usuario</ControlLabel>
                    <ButtonToolbar>
                        <ToggleButtonGroup
                            type="radio" name="director"
                            defaultValue={true}>
                            <ToggleButton onClick={this.handleSelectedChange.bind(this, true)} value={true}>Director de fundación</ToggleButton>
                            <ToggleButton onClick={this.handleSelectedChange.bind(this, false)} value={false}>Contribuyente</ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>
                    <br />
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