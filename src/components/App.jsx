import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import '../styles/App.css';

import Landing from "./Landing";
import Fundaciones from "./Fundaciones";
import Fundacion from "./Fundacion";
import QuienesSomos from "./QuienesSomos";
import Proposito from "./Proposito";
import Contactenos from "./Contactenos";
import SignUp from "./SignUp";
import NavigationMenu from "./NavigationMenu";
import Footer from "./Footer"

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
              <Route exact path = "/" component={Landing}/>
              <Route exact path = "/fundaciones" component={Fundaciones}/>
              <Route exact path = "/fundaciones/:id" component={Fundacion}/>
              <Route exact path = "/proposito" component={Proposito}/>
              <Route exact path = "/quienessomos" component={QuienesSomos}/>
              <Route exact path = "/contactenos" component={Contactenos}/>
              <Route exact path = "/signup" component={SignUp}/>
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