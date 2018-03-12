import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import '../styles/App.css';
import Landing from "./Landing/Landing";
import Fundaciones from "./Fundaciones";
import QuienesSomos from "./QuienesSomos";
import Proposito from "./Proposito";
import Contactenos from "./Contactenos";
import SignUp from "./SignUp";
import NavigationMenu from "./NavigationMenu";
import InitialBanner from "../components/Landing/InitialBanner";

class App extends Component {
  render() {
    return (
      <Router>
        <div class="content">
          <div class="header">
            <InitialBanner/>
            <NavigationMenu />
          </div>
          <div class="body"> 
            <Route exact path = "/" component={Landing}/>
            <Route path = "/fundaciones" component={Fundaciones}/>
            <Route path = "/proposito" component={Proposito}/>
            <Route path = "/quienessomos" component={QuienesSomos}/>
            <Route path = "/contactenos" component={Contactenos}/>
            <Route path = "/signup" component={SignUp}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;