import React, { Component } from 'react';
import logo from '../assets/FundacionesLOGO.jpg';
import '../styles/App.css';
import NavigationBar from "../components/NavigationBar.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo"/>  
          <h1 className ="App-title">fUNdaciones</h1>
        </header>
        <ul>
          <NavigationBar name = "Inicio"/>
          <NavigationBar name = "Fundaciones"></NavigationBar>
          <NavigationBar name = "Proposito"></NavigationBar>
          <NavigationBar name = "Quienes Somos"></NavigationBar>
          <NavigationBar name = "Contactenos"></NavigationBar>
        </ul>
      </div>
    );
  }
}

export default App;
