import React, { Component } from 'react';
import Mapa from './Mapa';
import "../../styles/Evento.css";
import WebApiService from '../Service/WebApiService';
import { Button} from "react-bootstrap";
import {connect} from 'react-redux';
import swal from 'sweetalert2'
//import PDFViewer from '../Helpers/PDF';
//import NewWindow from 'react-new-window';
//import PopoutWindow from 'react-popout'

const mapStateToProps = state => {
  return {
    user : state.user
  }
}

class Evento extends Component {
  constructor(props){
    super(props) 
    this.state = {
      pdfUrl : "1",
      buttonDisabled: false,
      buttonDisabledPDF: false,
      buttonDisabledInv: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  openPDF(urlPdf){
    this.setState({buttonDisabledInv: true});
    var data = {
      'direction': 'events/pdf/',
      'param' : this.props.event.id,
    }
    WebApiService.GetURL(data).then(res =>{
      this.setState({
        pdfUrl: res,
      });
      window.open('/pdf?url='+this.state.pdfUrl, '_blank');
      this.setState({buttonDisabledInv: false});
    });
  }
  downloadPDF(urlPdf){
    this.setState({buttonDisabledPDF: true});
    var data = {
      'direction': 'events/pdf/',
      'param' : this.props.event.id,
    }
    WebApiService.GetURL(data).then(res =>{
      this.setState({
        pdfUrl: res,
      });
      window.open(this.state.pdfUrl +'.pdf', '_blank');
      this.setState({buttonDisabledPDF: false});
    });
  }

  handleSubmit() {
    this.setState({buttonDisabled: true});
    var data = {
      'direction': 'contributors/events',
      'param' : '',
      'body' : { "contributor_event": {"contributor_id": this.props.user.id, "event_id": this.props.event.id}},  
      'type' : 1,
      'headers': {'X-Contributor-Email': this.props.user.email, 'X-Contributor-Token': this.props.user.token,'Content-Type': 'application/json' }
    }
    
    WebApiService.Post(data).then(res =>{
      this.setState({buttonDisabled: false});
      res.json().then(result => {
        if (res.status === 201) {
          swal(
            'Exito',
            'Te has suscrito al evento',
            'success'
          )
        } else {
          swal(
            'Error',
            result.Error,
            'error'
          )
        }
      });
    });
    
  }

  render() {
    return (
      <div className="todo">
        <h1 className="text-center">{this.props.event.name}</h1>
        <div className="panel panel-success">
          <div className="panel-heading">
            <h3 className="panel-title">Descripción</h3>
          </div>
          <div className="panel-body">
           <p>{this.props.event.description}</p>
          </div>
        </div>
        <div className="panel panel-success">
          <div className="panel-heading">
            <h3 className="panel-title">Fecha</h3>
          </div>
          <div className="panel-body">
           <p>{new Date(this.props.event.startDate).toUTCString()}</p>
          </div>
        </div>
        <div className="panel panel-success">
          <div className="panel-heading">
            <h3 className="panel-title">Dirección</h3>
          </div>
          <div className="panel-body">
           <p>{this.props.event.direction}</p>
          </div>
        </div>
        <div className="text-center">
          <Mapa defaultCenter={{lat: parseFloat(this.props.event.latitude) , lng: parseFloat(this.props.event.longitude)}}/>
        </div>
        <Button onClick={() => { this.openPDF(this.state.pdfUrl)}} className="btn btn-success btn-block suscribirse"  disabled={this.state.buttonDisabledInv}>Mostrar invitación</Button>
        <Button onClick={() => { this.downloadPDF(this.state.pdfUrl)}} className="btn btn-success btn-block suscribirse"  disabled={this.state.buttonDisabledPDF}>Descargar invitación</Button>
        {(this.props.user.userType === false && this.props.perfil === false)  &&
          <Button onClick={this.handleSubmit} className="btn btn-success btn-block suscribirse" disabled={this.state.buttonDisabled}>Suscribirse</Button>}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Evento)