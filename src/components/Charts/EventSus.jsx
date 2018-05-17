import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'
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
      years: [],
      data: []
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    var data = {
      'direction': 'contributors/yearevent?id=' + this.props.user.id,
      'param': ''
    }
    WebApiService.Get(data).then(res => {
      this.setState({
        years: res.sort(),
      });

      var data = {
        'direction': 'contributors/yeareventdata?id=' + this.props.user.id +'&year=' + this.state.years[0],
        'param': ''
      }
      WebApiService.Get(data).then(res => {
        this.setState({
          data: res,
        });
      });
    });
  }

  handleClick(i, year) {
    var data = {
      'direction': 'contributors/yeareventdata?id=' + this.props.user.id +'&year=' + year,
      'param': ''
    }
    WebApiService.Get(data).then(res => {
      this.setState({
        data: res,
      });
    });
    this.setState({active : i});
  }

  render() {
    const {years, active} = this.state;
    const allYears = years.map((year, key) => {
        return(
          <Pagination.Item onClick={this.handleClick.bind(this, key, year)} key={key} active={key === active}>{year}</Pagination.Item>
        );
      }
    );

    return (
      <div>
      <div style={{height:"50rem", width:"100rem", "paddingBottom":"5rem", margin:"auto"}}>
        <h1>Suscripciones a eventos</h1>
        <ResponsiveLine
          data={this.state.data}
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
        {allYears}
      </Pagination> 

      </div>
    );
  }
}
export default connect(mapStateToProps)(EventSus)