import React, { Component } from 'react';
import InitialBanner from "./Landing/InitialBanner";

export default class QuienesSomos extends Component {
    render() {
      return (
        <div>
          <InitialBanner />
          <h1 className="text-center">Quienes Somos</h1>
          <h2 className="text-center">Somos Lantri </h2>
          <br/> 
          <p className="text-center"> Un equipo conformado por estudiantes de la universidad nacional que busca facilitar la conexion entre fundaciones y
            sus posibles contribuyentes mediante una plataforma web.</p>
          <h3 className="text-center"> Integrantes:</h3>         
          <dl className="text-center" style={{type: "none"}}>
            <dd>Juan Manuel Alvarez Duque </dd>
            <dd>Nicolas Campuzano</dd>
            <dd>Luis Fernando Castro Peralta </dd>
            <dd>Juan David Garcia Niño </dd>
            <dd>Wilson Andres Piravaguen </dd>
          </dl> 
        </div>
      );
    }
  }
