import React, { Component } from 'react';
import '../../styles/Item.css';

class Item extends Component {
  render() {
    return (
      <div className = " column-md-8 horizontalMenu">
        <ul onClick={this.props.onClick} className={this.props.selected ? 'selected' : 'no-selected'}>
          {this.props.name}
        </ul>
      </div>
    );
  }
}

export default Item;
