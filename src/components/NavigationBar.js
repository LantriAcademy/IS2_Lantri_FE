import React, { Component } from 'react';
import '../styles/NavigationBar.css';

class NavigationBar extends Component {
  
  constructor(props){
    super(props);
    this.state ={
      selected:false
    }
    this.handleClick=this.handleClick.bind(this)
  }

  handleClick(event){
    event.preventDefault();
    this.setState({
      selected:!this.state.selected 
    })
  }

  render() {
    return (
      <div className = "horizontalMenu">
       <ul onClick={this.handleClick}
       className={this.state.selected?'selected':'no-selected'}>
            {this.props.name}
            </ul>
      </div>
    );
  }
}

export default NavigationBar;
