import React, { Component } from 'react';
import "../../styles/landing.css";
import InitialBanner from "./InitialBanner";
import Slider from "./Slider";

import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    user : state
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login : (token, id, foundationId) => dispatch({
      type : 'LOGIN', token: token, id: id, foundationId: foundationId
    }),
    logoff: () =>({
      type: 'LOGOFF'
    })
  }
}

class Landing extends Component {
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
export default connect(mapStateToProps, mapDispatchToProps)(Landing);