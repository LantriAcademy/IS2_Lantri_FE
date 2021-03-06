import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Grid, Row, Col, Thumbnail, Button, Pagination} from "react-bootstrap";
import WebApiService from '../Service/WebApiService';
import '../../styles/Fundaciones.css';

export default class TagFundaciones extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fundaciones : [],
      active: 1,
      pages: null,
      change: true,
    }
    this.handleClick = this.handleClick.bind(this);
  }
  componentWillMount() {
    var data = {
      'direction': '/foundations/size',
      'param' : '',
    }
    WebApiService.Get(data).then(res =>{
      this.setState({
        pages: Math.ceil(res/6),
      });
    });
  }
  handleClick(i) {
    this.setState({active : i, change: true});
  }
  render() {
    const {fundaciones, change, active, pages} = this.state;
    if (change) {
      var data = {
        'direction': 'foundations/page/',
        'param' : this.state.active,
      }
      WebApiService.Get(data).then(res =>{
        this.setState({
          fundaciones: res,
          change: false
        });
      });
    }

    const todoFundaciones = fundaciones.map((fundacion, index) => {
      var route = "/fundaciones/" + fundacion.id;
        return(
          <Col key={index} xs={6} md={6}>
            <Thumbnail>
              <img src={WebApiService.baseUrl + fundacion.avatar.url} alt="Logo" height="270" width="380" />
              <h3>{fundacion.name}</h3>
              <p>{fundacion.direction}</p>
              <p><Button bsStyle="success" componentClass={Link} href={route} to={route}>Ver mas</Button></p>
            </Thumbnail>
          </Col>
        );
      }
    );
    let items = [];
    for (let number = 1; number <= pages; number++) {
      items.push(
        <Pagination.Item onClick={this.handleClick.bind(this, number)} key={number} active={number === active}>{number}</Pagination.Item>
      );
    }
    return (
      <div>
        <h1 className="text-center">Las fundaciones perfectas</h1>
        <div className="row">
          {todoFundaciones}
        </div>
        <div className="text-center row">
          <Pagination bsSize="large">{items}</Pagination>
        </div>
      </div>
    );
  }
}
