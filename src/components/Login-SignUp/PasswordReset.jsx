import React, { Component } from 'react'
import { Panel, FormControl, ControlLabel, FormGroup } from 'react-bootstrap'
import '../../styles/resetPassword.css'
import { FormErrors } from "../Helpers/FormErrors.js"
import WebApiService from '../Service/WebApiService'
import swal from 'sweetalert2'


export default class PasswordReset extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            password2: '',
            formErrorsEmail: { email: '' },
            formErrorsPassword: { password: '' },
            formErrorsPassword2: { password2: '' },
            emailValid: false,
            passwordValid: false,
            password2Valid: false,
            formValid: false,
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUserInput(e) {
        let formErrorsEmail = this.state.formErrorsEmail;
        let formErrorsPassword = this.state.formErrorsPassword;
        let formErrorsPassword2 = this.state.formErrorsPassword2;
        switch (e.target.name) {
            case 'email':
                var emailValid = e.target.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                if(emailValid){
                    formErrorsEmail.email = '';
                    this.setState({email: e.target.value, emailValid: true}, this.validForm);
                }else{
                    formErrorsEmail.email = ' no valido';
                    this.setState({email: e.target.value, emailValid: false}, this.validForm);
                }
                break;
            case 'password':
                var passwordValid = e.target.value.length >= 6;
                if(passwordValid){
                    formErrorsPassword.password = '';
                    this.setState({password: e.target.value, passwordValid: true}, this.validForm);
                }else{
                    formErrorsPassword.password = ' debe tener almenos 6 caracteres';
                    this.setState({password: e.target.value, passwordValid: false}, this.validForm);
                }
                break;
            case 'password2':
                var password2Valid = e.target.value === this.state.password;
                if(password2Valid){
                    formErrorsPassword2.password2 = '';
                    this.setState({password2: e.target.value, password2Valid: true}, this.validForm);
                }else{
                    formErrorsPassword2.password2 = ' deben coincidir';
                    this.setState({password2: e.target.value, password2Valid: false}, this.validForm);
                }
                break;
            default:
                break;
        }
    }
    validForm(){
        this.setState({formValid: this.state.password2Valid && this.state.passwordValid  && this.state.emailValid});
    }
    handleSubmit() {
        const urlParams = new URLSearchParams(this.props.location.search)
        const key = urlParams.get('token');
        var data = {
            'direction': 'contributor/change_password',
            'param': '',
            'body': {'reset_token': key , 'email': this.state.email, "contributor": {'password': this.state.password, 'password_confirmation': this.state.password2}},
        }
        this.setState({ email: '', password: '', password2:'', formValid: false });
        WebApiService.Post(data).then(res =>{
            if (res.status === 200) {
                res.json().then((result) => {
                    this.props.history.push("/");
                });
                swal(
                    'Éxito',
                    'Su contraseña se ha cambiado',
                    'success'
                );
            } else {
                swal(
                    'Error',
                    'No hemos podido cambiar su contraseña, intente más tarde',
                    'error'
                );
            }
        });
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
                    <div>
                        <FormErrors formErrors={this.state.formErrorsEmail} />
                    </div>
                    <FormGroup>
                        <ControlLabel>Contraseña</ControlLabel>
                        <input type="password" className="form-control" name="password"
                            placeholder="Contraseña"
                            value={this.state.password}
                            onChange={this.handleUserInput} />
                    </FormGroup>
                    <div>
                        <FormErrors formErrors={this.state.formErrorsPassword} />
                    </div>
                    <FormGroup>
                        <ControlLabel>Confirme su contraseña</ControlLabel>
                        <input type="password" className="form-control" name="password2"
                            placeholder="Contraseña"
                            value={this.state.password2}
                            onChange={this.handleUserInput} />
                    </FormGroup>
                    <div>
                        <FormErrors formErrors={this.state.formErrorsPassword2} />
                    </div>
                    <button className="btn btn-success" onClick={this.handleSubmit} disabled={!this.state.formValid}>Cambiar</button>
                </Panel.Body>
            </Panel>
        </div>
    }
}