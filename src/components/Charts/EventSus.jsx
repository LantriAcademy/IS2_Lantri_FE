import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import data from './DataFalse2.jsx';
import { Grid, Row, Col, Thumbnail, Button, Pagination} from "react-bootstrap";

export default class EdadBenef extends Component {
  constructor(props){
    super(props)
    this.state = {
      active: 0,
    }

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
      alert(i);
      this.setState({active : i});
  }
  render() {
    return (
      <div>
      <div style={{height:"50rem", width:"100rem", "paddingBottom":"5rem", margin:"auto"}}>
        <h1>Suscripciones a eventos</h1>
        <ResponsiveBar
          data={data}
          keys={[
            "Eventos"
          ]}
          indexBy="month"
          margin={{
              "top": 20,
              "right": 130,
              "bottom": 50,
              "left": 60
          }}
          padding={0.3}
          colors="dark2"
          colorBy="id"
          defs={[
              {
                  "id": "dots",
                  "type": "patternDots",
                  "background": "inherit",
                  "color": "#38bcb2",
                  "size": 4,
                  "padding": 1,
                  "stagger": true
              },
              {
                  "id": "lines",
                  "type": "patternLines",
                  "background": "inherit",
                  "color": "#eed312",
                  "rotation": -45,
                  "lineWidth": 6,
                  "spacing": 10
              }
          ]}
          borderColor="inherit:darker(1.6)"
          axisBottom={{
              "orient": "bottom",
              "tickSize": 5,
              "tickPadding": 5,
              "tickRotation": 0,
              "legend": "Mes",
              "legendPosition": "center",
              "legendOffset": 36
          }}
          axisLeft={{
              "orient": "left",
              "tickSize": 5,
              "tickPadding": 5,
              "tickRotation": 0,
              "legend": "Eventos",
              "legendPosition": "center",
              "legendOffset": -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor="inherit:darker(1.6)"
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
