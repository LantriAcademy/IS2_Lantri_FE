import React, { Component } from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import '../styles/App.css'

import Landing from "./Landing/Landing";
import Fundaciones from "./Fundacion/Fundaciones";
import Fundacion from "./Fundacion/Fundacion";
import QuienesSomos from "./QuienesSomos";
import Perfil from "./Perfil/Perfil";
import PDF from "./Helpers/PDF";
import SignUp from "./Login-SignUp/SignUp";
import NavigationMenu from "./Menu/NavigationMenu";
import Footer from "./Landing/Footer"
import CrearFundacion from "./Fundacion/CrearFundacion"
import CrearEvento from "./Fundacion/CrearEvento"
import Alert from "./Alert/Alert"
import CrearBeneficiado from "./Beneficiado/CrearBeneficiado"
import EditarBeneficiado from "./Beneficiado/EditarBeneficiado"
import PerfilBeneficiado from "./Beneficiado/PerfilBeneficiado";
import PasswordReset from './Login-SignUp/PasswordReset';
import passwordEmail from './Login-SignUp/PasswordEmail';

class App extends Component {
  
  render() {
    return (
      <div>
        <Router>
          <div className="content">
            <div className="header">
              <NavigationMenu />
            </div>
            <div className="body">
              <Alert />   
              <Route exact path = "/" component={Landing}/>
              <Route exact path = "/fundaciones" component={Fundaciones}/>
              <Route exact path = "/pdf" component={PDF}/>
              <Route exact path = "/crearEvento" component={CrearEvento}/>
              <Route exact path = "/crearFundacion" component={CrearFundacion}/>
              <Route exact path = "/crearBeneficiado" component={CrearBeneficiado}/>
              <Route exact path = "/fundaciones/:id" component={Fundacion}/>
              <Route exact path = "/fundaciones/:id/:kid" component={PerfilBeneficiado}/>
              <Route exact path = "/editarBeneficiado" component={EditarBeneficiado}/>
              <Route exact path = "/perfil" component={Perfil}/>
              <Route exact path = "/quienessomos" component={QuienesSomos}/>
              <Route exact path = "/signup" component={SignUp}/>
              <Route path = "/passwordReset" component={PasswordReset}/>
              <Route exact path = "/passwordEmail" component={passwordEmail}/>
            </div>
            <div className="footer">
              <Footer />
            </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;