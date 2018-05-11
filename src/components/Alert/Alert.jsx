import React, { Component } from 'react';
import '../../styles/alert.css';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    alert: state.alert
  }
}
class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: false
    };
    //console.log("Alert View");
    //console.log(this.props);
  }
  componentWillReceiveProps(nextProps) {

    if (nextProps.alert.show) {
      this.setState({ timer: true });
      setTimeout(function () {
        this.setState({ timer: false });
      }.bind(this), 5000)
    }else{
      this.setState({timer:false}); 
    }
    
  }
  render() {
    return (
      <div>
        {(this.props.alert.show && this.state.timer) &&
          <div className={"no-margin alert  alert-" + (this.props.alert.typeAlert !== '' ? this.props.alert.typeAlert : "info") + " alert-dismissible"} role="alert">
            <button type="button" className="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            {this.props.alert.message}
          </div>
        }
      </div>
    );
  }
}
export default connect(mapStateToProps)(Alert);
