import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Navbar, Nav, NavItem } from "react-bootstrap"
import "../../styles/navigationMenu.css"
import LoginModal from "../Login-SignUp/LoginModal"
import {connect} from 'react-redux'

const mapDispatchToProps = dispatch => {
    return {
        logoff: () => dispatch({
            type: 'LOGOFF'
        }),
        get: () => dispatch({
            type: "GET"
        })
    }
}

class NavigationMenu extends Component {
    
    constructor(props){
        super(props);    
        this.state = {
            show : false
        };
        this.handleClose = this.handleClose.bind(this);
        this.callLogin = this.callLogin.bind(this);
        this.callLogoff = this.callLogoff.bind(this);
    }
    callLogoff(){
        //console.log("callLogoff");
        this.props.logoff();
    }
    handleClose() {
        this.setState({ show: false });
    }

    callLogin(e){
        this.setState({show:true});
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
                            {this.props.user.token !== undefined && this.props.user.userType === false && this.props.user.token !== ""? (
                                <NavItem eventKey={6} componentClass={Link} href="/perfil" to="/perfil">Perfil</NavItem>
                            ):(console.log(""))
                            }
                            
                            {this.props.user.token !== undefined && this.props.user.token !== ""? (
                                <NavItem eventKey={7} className="btn-login" componentClass={Link} href="/" to="/" onClick={(e) => this.callLogoff(e)}>Salir</NavItem>
                            ) : (
                                <NavItem eventKey={7} className="btn-login" onClick={(e) => this.callLogin(e)}>Inicio Sesion</NavItem>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
      )
    }
}
// start of code change
const mapStateToProps = (state) => { 
    return { user: state.user };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(NavigationMenu)