import React, { Component } from 'react';
import Item from "../components/Item.js";

var menuItems = [
  {name: 'Inicio', selected: true},
  {name: 'Fundaciones', selected: false},
  {name: 'Proposito', selected: false},
  {name: 'Quienes Somos', selected: false},
  {name: 'Contactenos', selected: false},
]

class Menu extends Component {
  constructor(props){
    super(props);
    this.state = {
      item : menuItems,
    }
  }

  handleClick(i){
    const _item = this.state.item.slice();
    for (var j = 0; j < this.state.item.length; j++) {
      if (j === i) {
        _item[j].selected = true; 
      } else {
        _item[j].selected = false;
      }
    }
    this.setState({item: _item})
  }

  drawItem(i) {
    return (
      <Item name={this.state.item[i].name}  onClick={() => this.handleClick(i)}  selected={this.state.item[i].selected} />
    );
  }

  render() {
    return (
      <div>
        {this.drawItem(0)}
        {this.drawItem(1)}
        {this.drawItem(2)}
        {this.drawItem(3)}
        {this.drawItem(4)}
      </div>
    );
  }
}

export default Menu;
