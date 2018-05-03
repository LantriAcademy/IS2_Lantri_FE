import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'
import data from './DataFalse2.jsx';
import WebApiService from '../Service/WebApiService';
import {Pagination} from "react-bootstrap";
import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    user : state.user
  }
}

class EventSus extends Component {
  constructor(props){
    super(props)
    this.state = {
      active: 0,
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    this.setState({active : i});
  }

  render() {
    return (
      <div>
      <div style={{height:"50rem", width:"100rem", "paddingBottom":"5rem", margin:"auto"}}>
        <h1>Suscripciones a eventos</h1>
        <ResponsiveLine
          data={data}
          margin={{
              "top": 50,
              "right": 110,
              "bottom": 50,
              "left": 60
          }}
          minY="auto"
          stacked={true}
          axisBottom={{
              "orient": "bottom",
              "tickSize": 5,
              "tickPadding": 5,
              "tickRotation": 0,
              "legend": "Mes",
              "legendOffset": 36,
              "legendPosition": "center"
          }}
          axisLeft={{
              "orient": "left",
              "tickSize": 5,
              "tickPadding": 5,
              "tickRotation": 0,
              "legend": "Eventos",
              "legendOffset": -40,
              "legendPosition": "center"
          }}
          colors="dark2"
          dotSize={10}
          dotColor="inherit:darker(0.3)"
          dotBorderWidth={2}
          dotBorderColor="#ffffff"
          enableDotLabel={true}
          dotLabel="y"
          dotLabelYOffset={-12}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
      />
      </div>

      <Pagination bsSize="medium">
        <Pagination.Item onClick={this.handleClick.bind(this, 0)} key={0} active={0 === this.state.active}>2016</Pagination.Item>
        <Pagination.Item onClick={this.handleClick.bind(this, 1)} key={1} active={1 === this.state.active}>2017</Pagination.Item>
        <Pagination.Item onClick={this.handleClick.bind(this, 2)} key={2} active={2 === this.state.active}>2018</Pagination.Item>
      </Pagination> 

      </div>
    );
  }
}
export default connect(mapStateToProps)(EventSus)