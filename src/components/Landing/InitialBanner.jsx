import React, { Component } from 'react';
import { Grid, Row, Col, Image, Button, Container } from "react-bootstrap";

export default class InitialBanner extends Component {
    render() {
        return (
            <div class="banner">
                <div class="container">
                    <Row>
                        <div class="text-center">
                            <h2 class="text-dec">fUndaciones</h2>
                            <div class="intro-para text-center">
                                <p class="big-text">¡Animate!</p>
                                <p class="small-text">Devuelve la sonrisa a los niños</p>
                            </div>
                        </div>
                    </Row>
                </div>
            </div>
        );
    }
}
