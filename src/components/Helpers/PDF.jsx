import React, { Component } from 'react';
import PDFViewer from 'mgr-pdf-viewer-react'
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    loading: state.loading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    ShowLoader: () => dispatch({
      type: 'SHOW'
    }),
    HideLoader: () => dispatch({
      type: 'HIDE'
    }),
  }
}
class PDF extends Component {
  constructor(props) {
    super(props);
    const urlParams = new URLSearchParams(this.props.location.search)
    const key = urlParams.get('url');
    this.state = {
      url: key
    }
    this.props.ShowLoader();
    setTimeout(() => { this.props.HideLoader() }, 1000);
  }
  render() {
    return (
      <PDFViewer document={{
        url: this.state.url
      }} />
    );

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PDF)