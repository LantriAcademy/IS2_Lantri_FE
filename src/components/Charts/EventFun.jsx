import React, { Component } from 'react';
import { ResponsiveLine } from '@nivo/line'
import WebApiService from '../Service/WebApiService';
import {Pagination} from "react-bootstrap";

export default class EventFun extends Component {
  constructor(props){
    super(props)
    this.state = {
      active: 0,
      years: [],
      data: [],
      buttonDisabled: false,
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleDownload = this.handleDownload.bind(this);
  }

  handleDownload(){
    this.setState({buttonDisabled: true});
    var a = document.getElementById("chart2").childNodes;
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

    const {years, active} = this.state;
    genPNGDataURL(mySVG, () => {
      var base64 = can.toDataURL();
      var data = {
        'direction': 'chart_pdf',
        'param' : '',
        'body': {'title': 'Eventos ' + years[active] + '', 'chart': base64}
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
      'direction': 'foundations/yearevent?id=' + this.props.fundacion_id,
      'param': ''
    }
    WebApiService.Get(data).then(res => {
      this.setState({
        years: res.sort(),
      });

      var data = {
        'direction': 'foundations/yeareventdata?id=' + this.props.fundacion_id +'&year=' + this.state.years[0],
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
      'direction': 'foundations/yeareventdata?id=' + this.props.fundacion_id +'&year=' + year,
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
      <h1>Eventos por meses</h1>
      <div id="chart2" style={{height:"50rem", width:"100rem", margin:"auto"}}>
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

      <div>
      <Pagination bsSize="medium">
        {allYears}
      </Pagination> 
      </div>

      <button onClick={this.handleDownload} className="btn btn-success"  disabled={this.state.buttonDisabled}>Descargar</button>

      </div>
    );
  }
}