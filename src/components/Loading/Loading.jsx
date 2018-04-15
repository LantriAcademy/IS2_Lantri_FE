import React, { Component } from 'react';
import '../../styles/loading.css';

import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    loading: state.loading
  }
}
class Loading extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <div>
        {(this.props.loading.show) && 
          <div>
            <div class="bg_load"></div>
            <div class="wrapper">
              <div class="inner">
                <span>L</span>
                <span>o</span>
                <span>a</span>
                <span>d</span>
                <span>i</span>
                <span>n</span>
                <span>g</span>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
export default connect(mapStateToProps)(Loading)