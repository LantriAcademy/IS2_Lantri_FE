import React, { Component } from 'react';
import WebApiService from '../Service/WebApiService';
import "../../styles/ListaEventos.css";
import { Button, Grid, Row, Col} from "react-bootstrap";
import Evento from './Evento';

export default class ListaEventos extends Component {
  constructor(props){
    super(props)
    this.state = {
      events: [],
      active: 0,
    }
  }

  componentWillMount() {
    var data = {
      'direction': '/events',
      'param' : '',
    }
    WebApiService.Get(data).then(res =>{
      this.setState({
        events: res,
      });
    });
  }

  handleClick(i) {
    this.setState({active : i});
  }

  render() {
    const {events, active} = this.state;
    const allEvents = events.map((event, index) => {
        return(
          <div key={index}>
            <a onClick={this.handleClick.bind(this, index)} className={"list-group-item list-group-item-action flex-column align-items-start " + (active === index ? "active" : "")}>
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1"><strong>{event.id}</strong></h5>
              </div>
              <p className="mb-1">{event.description}</p>
            </a>
          </div>
        );
      }
    );

    const evento = events.map((event, index) => {
      if (index == active) {
          return (
            <Evento event={event}/>
          );
        }
      }
    );

    return (
      <div>
      <Row>
        <Col sm={5}>
          <div className="list-group lista">
            {allEvents}
          </div>
        </Col>
        <Col sm={7}>
          {evento}
        </Col> 
      </Row>
      </div>
    );
  }
}