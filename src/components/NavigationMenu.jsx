import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {Navbar, Nav, NavItem} from "react-bootstrap";
import "../styles/navigationMenu.css"

export default class NavigationMenu extends Component {
    render() {
      return ( 
          <Navbar default fixedTop>
            <Navbar.Header>
                <Navbar.Brand>
                    <Link to="/">f<span>UN</span>daciones </Link>
                </Navbar.Brand>
                <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
                <Nav pullRight>
                    <NavItem eventKey={1} componentClass={Link} href="/" to ="/">Inicio</NavItem>
                    <NavItem eventKey={2} componentClass={Link} href="/fundaciones" to ="/fundaciones">Fundaciones</NavItem>
                    <NavItem eventKey={3} componentClass={Link} href="/proposito" to ="/proposito">Proposito</NavItem>
                    <NavItem eventKey={4} componentClass={Link} href="/quienessomos" to ="/quienessomos">Quienes Somos</NavItem>
                    <NavItem eventKey={5} componentClass={Link} href="/contactenos" to ="/contactenos">Contactenos</NavItem>
                    <NavItem eventKey={6} componentClass={Link} className="btn-login" href="/" to ="/">Inicio Sesion</NavItem>
                </Nav>
          </Navbar.Collapse>
          </Navbar>
      )
    }
  }
