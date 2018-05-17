import React, { Component } from 'react';

export default class Inicio extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pdfUrl: "1",
      text: ""
    }
  }
  componentWillMount() {
    var texto = ''
    if (this.props.director) { //Director
      texto = "Biografia"
    } else { //Contribuyente
      texto = "Descripción"
    }
    this.setState({
      text: texto
    });
  }
  
  mostrarBio(){
    if(this.props.biodes !== ""){
      return (
          <div className="panel panel-success">
            <div className="panel-heading">
              <h3 className="panel-title">{this.state.text}</h3>
            </div>
            <div className="panel-body">
              <p>{this.props.biodes}</p>
            </div>
          </div>
      );
    }
  }
  render() {
    return (
      <div>
          <h1 className="text-center">Bienvenido {this.props.usuario.name} {this.props.usuario.lastname}</h1>
          <br></br>
          {this.mostrarBio()}
                       <div className="panel panel-success">        
                        <div className="panel-heading">
              <h3 className="panel-title">Número de telefono</h3>
            </div>
            <div className="panel-body">
              <p>{this.props.usuario.phone}</p>
            </div> </div>
             <div className="panel panel-success">        
                        <div className="panel-heading">
              <h3 className="panel-title">Correo Eléctronico</h3>
            </div>
            <div className="panel-body">
              <p>{this.props.usuario.email}</p>
            </div> </div>
            
        </div>
    );
  }
}
