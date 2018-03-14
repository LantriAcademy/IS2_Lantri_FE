import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, NavItem } from "react-bootstrap";
import "../styles/navigationMenu.css"
import LoginModal from "./LoginModal";

export default class NavigationMenu extends Component {
    constructor(){
        super();    
        this.state = {
            show : false
        };
        this.handleClose = this.handleClose.bind(this);
    }
    
    handleClose() {
        this.setState({ show: false });
    }

    render() {
        return (
            <div>
                <LoginModal show={this.state.show} hide={this.handleClose}/>
                <Navbar default fixedTop>
                    <Navbar.Header>
                        <Navbar.Brand>
                            <Link to="/">f<span>UN</span>daciones </Link>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                    </Navbar.Header>
                    <Navbar.Collapse>
                        <Nav pullRight>
                            <NavItem eventKey={1} componentClass={Link} href="/" to="/">Inicio</NavItem>
                            <NavItem eventKey={2} componentClass={Link} href="/fundaciones" to="/fundaciones">Fundaciones</NavItem>
                            <NavItem eventKey={3} componentClass={Link} href="/proposito" to="/proposito">Proposito</NavItem>
                            <NavItem eventKey={4} componentClass={Link} href="/quienessomos" to="/quienessomos">Quienes Somos</NavItem>
                            <NavItem eventKey={5} componentClass={Link} href="/contactenos" to="/contactenos">Contactenos</NavItem>
                            <NavItem eventKey={6} className="btn-login" onClick={() => {this.setState({show:true})}} >Inicio Sesion</NavItem>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
      )
    }
}
