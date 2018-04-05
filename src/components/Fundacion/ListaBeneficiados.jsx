import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Col, Thumbnail, Button, Pagination} from "react-bootstrap";
import fundacion1 from '../../assets/fundacion1.jpg';
import WebApiService from '../Service/WebApiService';

export default class ListaBeneficiados extends Component {
  constructor(props){
    super(props)
    this.state = {
      beneficiados : [],
      active: 1,
      pages: null,
      change: true,
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    var data = {
      'direction': '/foundation/benefited/size/',
      'param' : this.props.fundacion_id,
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
    const {beneficiados, change, active, pages} = this.state;

    if (change) {
      var data = {
        'direction': '/foundation/benefiteds/page/' + this.props.fundacion_id + '/',
        'param' : this.state.active,
      }
      WebApiService.Get(data).then(res =>{
        this.setState({
          beneficiados: res,
          change: false
        });
      });
    }

    const todoBeneficiados = beneficiados.map((beneficiado, index) => {
      var route = "/fundaciones/" + this.props.fundacion_id + "/" + beneficiado.id;
        return(
          <Col key={index} xs={6} md={6}>
            <Thumbnail src={fundacion1} alt="242x200">
              <h3>{beneficiado.name}</h3>
              <p>{beneficiado.preferences}</p>
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
        <h1 className="text-center">Lista de beneficiados</h1>
        <div className="row">
          {todoBeneficiados}
        </div>
        <div className="text-center row">
          <Pagination bsSize="large">{items}</Pagination>
        </div>
      </div>
    );
  }
}
