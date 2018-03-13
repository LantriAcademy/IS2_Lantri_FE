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
                            <h2 className="text-dec">fUndaciones</h2>
                            <div className="intro-para text-center">
                                <p className="big-text">¡Animate!</p>
                                <p className="small-text">Es hora de trabajar por los niños</p>
                            </div>
                        </div>
                    </Row>
                </div>
            </div>
        );
    }
}
