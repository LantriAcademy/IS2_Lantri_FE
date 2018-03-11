import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {Navbar, Nav, NavItem} from "react-bootstrap";
import "../styles/navigationMenu.css"

export default class NavigationMenu extends Component {
    render() {
      return ( 
          <Navbar default>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">Menu Principal</Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem eventKey={1} componentClass={Link} to ="/">Inicio</NavItem>
                    <NavItem eventKey={2} componentClass={Link} to ="/fundaciones">Fundaciones</NavItem>
                    <NavItem eventKey={3} componentClass={Link} to ="/proposito">Proposito</NavItem>
                    <NavItem eventKey={4} componentClass={Link} to ="/quienessomos">Quienes Somos</NavItem>
                    <NavItem eventKey={5} componentClass={Link} to ="/contactenos">Contactenos</NavItem>
                </Nav>
          </Navbar.Collapse>
          </Navbar>
      )
    }
  }
