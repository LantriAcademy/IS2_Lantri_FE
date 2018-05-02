import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import data from './DataFalse1.jsx';
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
        data[0] = {"age": "11", "Beneficiados": 40}
        this.setState({active : i});
    }

  render() {
    return (
      <div>
      <div style={{height:"50rem", width:"100rem", "paddingBottom":"2rem", margin:"auto"}}>
        <h1>Edades de los beneficiados</h1>
        <ResponsiveBar
          data={data}
          keys={[
              "Beneficiados"
          ]}
          indexBy="age"
          margin={{
              "top": 20,
              "right": 130,
              "bottom": 70,
              "left": 60
          }}
          padding={0.3}
          colors="accent"
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
              "legend": "Edad",
              "legendPosition": "center",
              "legendOffset": 36
          }}
          axisLeft={{
              "orient": "left",
              "tickSize": 5,
              "tickPadding": 5,
              "tickRotation": 0,
              "legend": "Beneficiados",
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
        <Pagination.Item onClick={this.handleClick.bind(this, 0)} key={0} active={0 === this.state.active}>1-10</Pagination.Item>
        <Pagination.Item onClick={this.handleClick.bind(this, 1)} key={1} active={1 === this.state.active}>11-20</Pagination.Item>
        <Pagination.Item onClick={this.handleClick.bind(this, 2)} key={2} active={2 === this.state.active}>21-30</Pagination.Item>
        <Pagination.Item onClick={this.handleClick.bind(this, 3)} key={3} active={3 === this.state.active}>31-40</Pagination.Item>
        <Pagination.Item onClick={this.handleClick.bind(this, 4)} key={4} active={4 === this.state.active}>41-50</Pagination.Item>
        <Pagination.Item onClick={this.handleClick.bind(this, 5)} key={5} active={5 === this.state.active}>51-60</Pagination.Item>
        <Pagination.Item onClick={this.handleClick.bind(this, 6)} key={6} active={6 === this.state.active}>61-70</Pagination.Item>
        <Pagination.Item onClick={this.handleClick.bind(this, 7)} key={7} active={7 === this.state.active}>71-80</Pagination.Item>
        <Pagination.Item onClick={this.handleClick.bind(this, 8)} key={8} active={8 === this.state.active}>81-90</Pagination.Item>
        <Pagination.Item onClick={this.handleClick.bind(this, 9)} key={9} active={9 === this.state.active}>91-100</Pagination.Item>
      </Pagination> 

      </div>
    );
  }
}

