import React, { Component } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import WebApiService from '../Service/WebApiService';
import {Pagination} from "react-bootstrap";
import "../../styles/EdadBenef.css";

export default class EdadBenef extends Component {
  constructor(props){
    super(props)
    this.state = {
      active: 0,
      layout: 'vertical',
      color : 'accent',
      data : [],
      buttonDisabled: false,
    }

    this.handleChangeLayout = this.handleChangeLayout.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  handleDownload(){
    this.setState({buttonDisabled: true});
    var a = document.getElementById("chart").childNodes;
    var b = a[0].childNodes;
    var svg = b[0].childNodes;
    var mySVG = svg[0];

    var can = document.createElement('canvas'),
    ctx = can.getContext('2d'),
    loader = new Image();

    function genPNGDataURL(mySVG, callback) {
      var svgAsXML = (new XMLSerializer()).serializeToString( mySVG );
    
      loader.width  = can.width  = mySVG.clientWidth;
      loader.height = can.height = mySVG.clientHeight;
    
      loader.onload = function() {
        ctx.drawImage( loader, 0, 0, loader.width, loader.height );
        callback(can.toDataURL());
      };
      loader.src = 'data:image/svg+xml,' + encodeURIComponent( svgAsXML );
    }

    genPNGDataURL(mySVG, () => {
      var base64 = can.toDataURL();
      var data = {
        'direction': 'chart_pdf',
        'param' : '',
        'body': {'title': 'Edades de los beneficiados', 'chart': base64}
      }
      WebApiService.Post(data).then(response => {
        response.blob().then(res =>{
          var url = URL.createObjectURL(res);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'file.pdf');
          document.body.appendChild(link);
          link.click();
          this.setState({buttonDisabled: false});
        });
      });
    });
  }

  componentWillMount() {
    var data = {
      'direction': 'foundations/stats/benefiteds?id=' + this.props.fundacion_id + '&max=10&min=1',
      'param': ''
    }
    WebApiService.Get(data).then(res => {
      this.setState({
        data: res,
      });
    });
  }

  handleChangeLayout(event){
    this.setState({layout: event.target.value});
  }

  handleChangeColor(event){
    this.setState({color: event.target.value});
  }

  handleClick(i, min, max) {
    var data = {
        'direction': 'foundations/stats/benefiteds?id=' + this.props.fundacion_id + '&max='+ max +'&min=' + min,
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
    return (
      <div>
      <h1>Edades de los beneficiados</h1>
      <div id="chart" style={{height:"45rem", width:"100rem", margin:"auto"}}>

        <ResponsiveBar
          data={this.state.data}
          keys={[
              "count"
          ]}
          indexBy="age"
          margin={{
              "top": 20,
              "right": 130,
              "bottom": 70,
              "left": 60
          }}
          padding={0.3}
          colors={this.state.color}
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
          layout={this.state.layout}
        />
      </div>

      <div className="options row">
        <div className='col-md-3'></div>
        <div className='col-md-3'>
          <label className='etiqueta'>Orientacion: </label>
          <select value={this.state.layout} onChange={this.handleChangeLayout}>
          <option value="vertical">Vertical</option>
          <option value="horizontal">Horizontal</option>
          </select>
        </div>
        <div className='col-md-3'>
          <label className='etiqueta'>Color: </label>
          <select value={this.state.color} onChange={this.handleChangeColor}>
          <option value="accent">Verde</option>
          <option value="d310">Azul</option>
          <option value="pastel1">Rosa</option>
          <option value="set1">Rojo</option>
          </select>
        </div>
        <div className='col-md-3'></div>
      </div>

      <div>
        <Pagination bsSize="medium">
          <Pagination.Item onClick={this.handleClick.bind(this, 0, 1, 10)} key={0} active={0 === this.state.active}>1-10</Pagination.Item>
          <Pagination.Item onClick={this.handleClick.bind(this, 1, 11, 20)} key={1} active={1 === this.state.active}>11-20</Pagination.Item>
          <Pagination.Item onClick={this.handleClick.bind(this, 2, 21, 30)} key={2} active={2 === this.state.active}>21-30</Pagination.Item>
          <Pagination.Item onClick={this.handleClick.bind(this, 3, 31, 40)} key={3} active={3 === this.state.active}>31-40</Pagination.Item>
          <Pagination.Item onClick={this.handleClick.bind(this, 4, 41, 50)} key={4} active={4 === this.state.active}>41-50</Pagination.Item>
          <Pagination.Item onClick={this.handleClick.bind(this, 5, 51, 60)} key={5} active={5 === this.state.active}>51-60</Pagination.Item>
          <Pagination.Item onClick={this.handleClick.bind(this, 6, 61, 70)} key={6} active={6 === this.state.active}>61-70</Pagination.Item>
          <Pagination.Item onClick={this.handleClick.bind(this, 7, 71, 80)} key={7} active={7 === this.state.active}>71-80</Pagination.Item>
          <Pagination.Item onClick={this.handleClick.bind(this, 8, 81, 90)} key={8} active={8 === this.state.active}>81-90</Pagination.Item>
          <Pagination.Item onClick={this.handleClick.bind(this, 9, 91, 100)} key={9} active={9 === this.state.active}>91-100</Pagination.Item>
        </Pagination> 
      </div>

      <button onClick={this.handleDownload} className="btn btn-success"  disabled={this.state.buttonDisabled}>Descargar</button>

      </div>
    );
  }
}

