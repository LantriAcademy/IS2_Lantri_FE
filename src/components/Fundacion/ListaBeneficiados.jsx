import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Col, Thumbnail, Button, Pagination } from "react-bootstrap";
import WebApiService from '../Service/WebApiService';
import { connect } from 'react-redux';
import EditarBeneficiado from '../Beneficiado/EditarBeneficiado'

const mapStateToProps = state => {
  return {
    user: state.user
  }
}

class ListaBeneficiados extends Component {
  constructor(props) {
    super(props)
    this.state = {
      beneficiados: [],
      active: 1,
      pages: null,
      change: true,
      texto: "Lista de beneficiados",
      buttonDisabled: false,
    }

    this.handleClick = this.handleClick.bind(this);
    this.downloadPdf = this.downloadPdf.bind(this);
  }


  downloadPdf(id) {
    this.setState({buttonDisabled: true});
    var data = {
      'direction': 'benefiteds/pdf',
      'param': '/' + id,
    }
    if (this.id >= 0) {
      data.param += '/' + this.props.user.id;
    }
    WebApiService.GetURL(data).then(url => {
      window.open(url + '.pdf', '_blank');
      this.setState({buttonDisabled: false});
    });
  }
  componentDidMount() {
    if(this.props.fundacion_id === null){//LISTA PEDIDA POR UN CONTRIBUYENTE
      var data = {
        'direction': '/foundations/benefiteds/size/',//NOSE EL COSO
        'param': 1,
      }
      this.setState({
        texto: "Personas apadrinadas"
      })
    }else{
      var data = {
        'direction': '/foundations/benefiteds/size/',
        'param': this.props.fundacion_id,
      }
    }

    WebApiService.Get(data).then(res => {
      this.setState({
        pages: Math.ceil(res / 6),
      });
    });
  }

  handleClick(i) {
    this.setState({ active: i, change: true });
  }

  mostrarBotonEditar(id){
    if(this.props.editar===true){
      return <Button bsStyle="primary" style={{ marginLeft: '10px', marginBottom: '10px' }} href={"/editarBeneficiado?Benid="+id} to={"/editarBeneficiado/"+id}>Editar</Button>
    }
  }

  render() {
    const { beneficiados, change, active, pages } = this.state;

    if (change) {
      if(this.props.fundacion_id === null){ //SI LO PIDE EL CONTRIBUYENTE
        var data = {
          'direction': '/foundations/benefiteds/page/' + 1 + '/',
          'param': this.state.active,
        }
      }else{
      var data = {
        'direction': '/foundations/benefiteds/page/' + this.props.fundacion_id + '/',
        'param': this.state.active,
      }
    }
      WebApiService.Get(data).then(res => {
        this.setState({
          beneficiados: res,
          change: false
        });
      });
    }

    const todoBeneficiados = beneficiados.map((beneficiado, index) => {
      var route = "/fundaciones/" + this.props.fundacion_id + "/" + beneficiado.id + "?Benid=" + beneficiado.id;
      return (
        <Col key={index} xs={6} md={6}>
          <Thumbnail>
            <img src={WebApiService.baseUrl + beneficiado.avatar.url} alt="Logo" height="270" width="380" />
            <h3>{beneficiado.name}</h3>
            <p>Edad: {beneficiado.age} años</p>
            <Button bsStyle="success" componentClass={Link} href={route} to={route}>Ver más</Button>
            <Button bsStyle="danger" style={{ marginLeft: '10px', marginBottom: '10px' }} onClick={this.downloadPdf.bind(this, beneficiado.id)} disabled={this.state.buttonDisabled}>Resumen</Button>
            {this.mostrarBotonEditar(beneficiado.id)}
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
        <h1 className="text-center">{this.state.texto}</h1>
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
export default connect(mapStateToProps)(ListaBeneficiados)