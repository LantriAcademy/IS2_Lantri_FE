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
class PDFMismaPag extends Component {
    constructor(props){
      super(props);
    }
    render() {
    return (
        <PDFViewer document={{
          url:this.props.url,
          base64:this.props.base64,
          file: this.props.file
        }} />
    );

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PDFMismaPag)