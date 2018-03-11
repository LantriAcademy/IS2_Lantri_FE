import React, { Component } from 'react';
import '../styles/Item.css';

class Item extends Component {
  render() {
    return (
      <div  class="column-md-8" className = "horizontalMenu">
        <ul onClick={this.props.onClick} className={this.props.selected ? 'selected' : 'no-selected'}>
          {this.props.name}
        </ul>
      </div>
    );
  }
}

export default Item;
