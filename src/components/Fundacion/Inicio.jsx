import React, { Component } from 'react';
import {Button} from "react-bootstrap";
import WebApiService from '../Service/WebApiService';

export default class Inicio extends Component {
    constructor(props) {
    super(props)
    this.state = {
      pdfUrl : "1",
      buttonDisabled: false,
    }
  }

  downloadPDF(urlPdf){
    this.setState({buttonDisabled: true});
    var data = {
      'direction': this.props.fundacion.pdf.url,
      'param' : '',
    }
    WebApiService.GetURL(data).then(res =>{
      this.setState({
        pdfUrl: res,
      });
      window.open(this.state.pdfUrl, '_blank');
      this.setState({buttonDisabled: false});
    });
  }
  
  
    render() {
      const {fundacion} = this.props;

      return (
        <div>
          <h1 className="text-center">Bienvenido a {fundacion.name}</h1>
          <br></br>
          <div className="panel panel-success">
            <div className="panel-heading">
              <h3 className="panel-title">Descripción</h3>
            </div>
            <div className="panel-body">
              <p>{fundacion.description}</p>
            </div>
          </div>
          <div className="panel panel-success">
            <div className="panel-heading">
              <h3 className="panel-title">Como Ayudarnos</h3>
            </div>
            <div className="panel-body">
              <p>{fundacion.howToHelp}</p>
            </div>
          </div>
          <div className="panel panel-success">
            <div className="panel-heading">
              <h3 className="panel-title">Contactenos</h3>
            </div>
            <div className="panel-body">
              <p>{fundacion.contactUs}</p>
            </div>
          </div>
          <Button onClick={() => { this.downloadPDF(this.state.pdfUrl)}} className="btn btn-success">Certificado de existencia de la fundacion</Button>
        </div>
      );
    }
  }
