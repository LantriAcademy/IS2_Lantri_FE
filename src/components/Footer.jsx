import React, { Component } from 'react';
import "../styles/Footer.css"

export default class Landing extends Component {
    render() {
      return (
        <div>
        <footer className="footer">
          <div className="container">
            <span className="text-muted">&copy; Lantri Academy 2018</span>
          </div>
        </footer>
        </div>
      );
    }
  }
