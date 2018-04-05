import React, { Component } from 'react';
import "../../styles/landing.css";
import InitialBanner from "./InitialBanner";
import Slider from "./Slider";

export default class Landing extends Component {
  constructor(props){
    super(props);
    console.log(this.props);
    this.props.login('Hola', 'id', 'asdasda');
    
  } 
  render() {
    return (
      <div>
        <InitialBanner />
        <Slider />
        
      </div>
    );
  }
}