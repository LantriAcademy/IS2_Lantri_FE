import React, { Component } from 'react';
import logo from '../assets/FundacionesLOGO.jpg';
import '../styles/App.css';
import Menu from "../components/Menu.js";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo"/>  
          <h1 className ="App-title">fUNdaciones</h1>
        </header>
        <Menu />
      </div>
    );
  }
}

export default App;
