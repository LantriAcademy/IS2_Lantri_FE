import React, { Component } from 'react';
import "../../styles/landing.css";
import InitialBanner from "./InitialBanner";
import Slider from "./Slider";

export default class Landing extends Component {
  render() {
    return (
      <div>
        <InitialBanner />
        <Slider />
      </div>
    );
  }
}
