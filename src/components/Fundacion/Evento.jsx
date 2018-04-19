import React, { Component } from 'react';
import Mapa from './Mapa';
import "../../styles/Evento.css";
import WebApiService from '../Service/WebApiService';
import { Button} from "react-bootstrap";
import {connect} from 'react-redux';
import swal from 'sweetalert2'
import PDFViewer from '../Helpers/PDF';
import NewWindow from 'react-new-window';
import PopoutWindow from 'react-popout'

const mapStateToProps = state => {
  return {
    user : state.user
  }
}

class Evento extends Component {
  constructor(props){
    super(props) 
    this.state = {
      pdfUrl : "1"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  componentWillMount() {
    var data = {
      'direction': 'events_pdf/',
      'param' : this.props.event.id,
    }
    WebApiService.GetURL(data).then(res =>{
      this.setState({
        pdfUrl: res,
      });
    });
  }

  openPDF(urlPdf){
    console.log("la URL del evento es: " + urlPdf);
    window.open('/pdf?url='+urlPdf, '_blank');
  /*<PopoutWindow url='popout.html' title='Window title' onClosing={this.popupClosed}>
    <div>Popped out content!</div>
  </PopoutWindow>*/
      /*{routes.map(({path,component: C})=>(
        <Route path = {path}
        component={(props) => <C url = "localhost:3000/events_pdf/1" />}
        />
      ))}*/
  }

  handleSubmit() {
    //console.log("OK")
    //console.log(this.props.user.id)
    //console.log(this.props.event.id)
    var data = {
      'direction': '/contributor_events',
      'param' : '',
      'body' : { "contributor_event": {"contributor_id": this.props.user.id, "event_id": this.props.event.id}},  
      'type' : 1,
      'headers': {'X-Contributor-Email': this.props.user.email, 'X-Contributor-Token': this.props.user.token,'Content-Type': 'application/json' }
    }
    
    WebApiService.Post(data).then(res =>{
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
        {/*<PDFViewer url={this.state.pdfUrl}/>//PARA PROBAR*/}
        <Button onClick={() => { this.openPDF(this.state.pdfUrl)}} className="btn btn-success btn-block suscribirse">Mostrar invitación</Button>
        <Button onClick={this.handleSubmit} className="btn btn-success btn-block suscribirse">Suscribirse</Button>
      </div>
    );
  }
}

export default connect(mapStateToProps)(Evento)