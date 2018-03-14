import React, { Component } from 'react';
import { Row } from "react-bootstrap";
import "../styles/Banner.css"

export default class InitialBanner extends Component {
    render() {
        return (
            <div className="banner">
                <div className="container">
                    <Row>
                        <div className="text-center">
                            <br></br>
                            <br></br>
                            <br></br>
                            <h1 className="text-dec">fUNdaciones</h1>
                            <div className="text-dec">
                                <h2 className="big-text">¡Animate!</h2>
                                <h3 className="small-text">Es hora de trabajar por los niños</h3>
                            </div>
                        </div>
                    </Row>
                </div>
            </div>
        );
    }
}
