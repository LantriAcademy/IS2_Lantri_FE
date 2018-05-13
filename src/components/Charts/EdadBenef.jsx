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
      data : []
    }

    this.handleChangeLayout = this.handleChangeLayout.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }
  handleDownload(){
    var data = {
      'direction': 'chart_pdf',
      'param' : '',
      'body': {'title': 'desde front', 'chart': 'data:image/png;base64,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'}
    }
    WebApiService.Post(data).then(response => {
      response.blob().then(res =>{
        var url = URL.createObjectURL(res);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'file.pdf');
        document.body.appendChild(link);
        link.click();
      });
    });
  }
    componentWillMount() {
      var data = {
        'direction': 'foundation/stats/benefiteds?id=' + this.props.fundacion_id + '&max=10&min=1',
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
          'direction': 'foundation/stats/benefiteds?id=' + this.props.fundacion_id + '&max='+ max +'&min=' + min,
          'param': ''
      }
      WebApiService.Get(data).then(res => {
        this.setState({
          data: res,
        });
      });

      this.setState({active : i});
    }

    pdf() {
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

      genPNGDataURL(mySVG, function() {
        var a2 = document.getElementById("chart2").childNodes;
        var b2 = a2[0].childNodes;
        var svg2 = b2[0].childNodes;
        var mySVG2 = svg2[0];
  
        var can2 = document.createElement('canvas'),
        ctx2 = can2.getContext('2d'),
        loader2 = new Image();
  
        function genPNGDataURL2(mySVG, callback) {
          var svgAsXML = (new XMLSerializer()).serializeToString( mySVG );
        
          loader2.width  = can2.width  = mySVG.clientWidth;
          loader2.height = can2.height = mySVG.clientHeight;
        
          loader2.onload = function() {
            ctx2.drawImage( loader2, 0, 0, loader2.width, loader2.height );
            callback(can2.toDataURL());
          };
          loader2.src = 'data:image/svg+xml,' + encodeURIComponent( svgAsXML );
        }
  
        genPNGDataURL2(mySVG2, function() {
          var base64 = can.toDataURL();
          var base64_2 = can2.toDataURL();
          document.getElementById("test1").src = base64;
          document.getElementById("test2").src = base64_2;
          console.log(base64);
          console.log(base64_2)
        });
      });

  }

  render() {
    return (
      <div>
      <img id="test1" alt="a" />
      <img id="test2" alt="a" />
      <button onClick={this.pdf} className="btn btn-success">PDF</button>
      <h1>Edades de los beneficiados</h1>
      <button onClick={this.handleDownload}>DOWNLOAD</button>
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

      </div>
    );
  }
}

