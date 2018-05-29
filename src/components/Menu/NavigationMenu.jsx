import React, { Component } from 'react'
import { Link } from "react-router-dom"
import { Navbar, Nav, NavItem } from "react-bootstrap"
import "../../styles/navigationMenu.css"
import LoginModal from "../Login-SignUp/LoginModal"
import WebApiService from '../Service/WebApiService';
import {connect} from 'react-redux'

const mapStateToProps = state => {
    return {
      user: state.user
    }
  }

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

        var data = {
            'direction': '',
            'param' : '',
            'body' : {"email": this.props.user.email},  
            'type' : 1,
            'headers': {}
        }

        if (this.props.user.userType === false) { //Contribuyente
            data.direction = 'signin_contributor/signout';
            data.headers = {'X-Contributor-Email': this.props.user.email, 'X-Contributor-Token': this.props.user.token,'Content-Type': 'application/json' }
        } else { //Director
            data.direction = 'signin_director/signout';
            data.headers = {'X-Director-Email': this.props.user.email, 'X-Director-Token': this.props.user.token,'Content-Type': 'application/json' }
        }
        
        WebApiService.Post(data).then(res =>{
            res.json().then(result => {
                console.log(result)
            });
        });

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
                            <NavItem eventKey={4} componentClass={Link} href="/quienessomos" to="/quienessomos">Quienes Somos</NavItem>
                            {this.props.user.token !== undefined && this.props.user.token !== ""? (
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
  
export default connect(mapStateToProps, mapDispatchToProps)(NavigationMenu)