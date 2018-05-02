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
    //console.log("Loading controller");
    //console.log(props);

  }
  render() {
    return (
      <div>
        {(this.props.loading.show) && 
          <div>
            <div class="bg_load"></div>
            <div class="wrapper">
              <div class="inner">
                <span>C</span>
                <span>a</span>
                <span>r</span>
                <span>g</span>
                <span>a</span>
                <span>n</span>
                <span>d</span>
                <span>o</span>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}
export default connect(mapStateToProps)(Loading)