import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Grid, Row, Col, Thumbnail, Button, Pagination} from "react-bootstrap";
import WebApiService from '../Service/WebApiService';
import '../../styles/Fundaciones.css';

import {connect} from 'react-redux';

const mapStateToProps = state => {
  return {
    user : state.user
  }
}
/* const mapDispatchToProps = dispatch => {
    return {
        logoff: () => dispatch({
            type: 'LOGOFF'
        }),
        get: () => dispatch({
            type: "GET"
        })
    }
} */

class Fundaciones extends Component {

  constructor(props){
    super(props)
    //console.log(this.props);
    this.state = {
      fundaciones : [],
      active: 1,
      pages: null,
      change: true,
    }

    this.handleClick = this.handleClick.bind(this);
    this.addFoundation = this.addFoundation.bind(this);
  }
  componentWillMount() {
    var data = {
      'direction': '/foundation/size',
      'param' : '',
    }
    WebApiService.Get(data).then(res =>{
      this.setState({
        pages: Math.ceil(res/6),
      });
    });
  
  }
  addFoundation(){
    window.location = "/crearFundacion";
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
          <Col key={index} xs={6} md={4}>
            <Thumbnail src={WebApiService.baseUrl + fundacion.avatar.url} alt="242x200">
              <h3>{fundacion.name}</h3>
              <p>{fundacion.direction}</p>
              <p><Button bsStyle="success" componentClass={Link} href={route} to={route}>Ver mas</Button></p>
            </Thumbnail>
          </Col>
        );
      }
    )
    

    let items = [];
    for (let number = 1; number <= pages; number++) {
      items.push(
        <Pagination.Item onClick={this.handleClick.bind(this, number)} key={number} active={number === active}>{number}</Pagination.Item>
      );
    }

    return (
      <div>
        <Grid className="slide-f">
          <Row>
            <h1 className="text-center">Lista de fundaciones</h1>
            {(this.props.user.token !== undefined && this.props.user.token != "" && this.props.user.foundationId == null)  &&
            <Button className="btn btn-success btn-circle btn-xl btn-plus" componentClass={Link} href="/crearFundacion" to="/crearFundacion">+</Button>}
            <div>
              {todoFundaciones}
            </div>
          </Row>
          <Row>
            <div className="text-center">
              <Pagination bsSize="large">{items}</Pagination>
            </div>
          </Row>
        </Grid>
      </div>
    );
  }
}
export default connect(mapStateToProps)(Fundaciones);