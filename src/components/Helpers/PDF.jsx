
/*import React from 'react';
import PDF from 'react-pdf-js';
import PDFSample from '../../assets/PDFSample.pdf'
 
export default class PDF extends React.Component {
  state = {};
 
  onDocumentComplete = (pages) => {
    this.setState({ page: 1, pages });
  }
 
  onPageComplete = (page) => {
    this.setState({ page });
  }
 
  handlePrevious = () => {
    this.setState({ page: this.state.page - 1 });
  }
 
  handleNext = () => {
    this.setState({ page: this.state.page + 1 });
  }
 
  renderPagination = (page, pages) => {
    let previousButton = <li className="previous" onClick={this.handlePrevious}><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    if (page === 1) {
      previousButton = <li className="previous disabled"><a href="#"><i className="fa fa-arrow-left"></i> Previous</a></li>;
    }
    let nextButton = <li className="next" onClick={this.handleNext}><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    if (page === pages) {
      nextButton = <li className="next disabled"><a href="#">Next <i className="fa fa-arrow-right"></i></a></li>;
    }
    return (
      <nav>
        <ul className="pager">
          {previousButton}
          {nextButton}
        </ul>
      </nav>
      );
  }
 
  render() {
    let pagination = null;
    if (this.state.pages) {
      pagination = this.renderPagination(this.state.page, this.state.pages);
    }
    return (
      <div>
        <PDF
          file = {this.props.url}
          onDocumentComplete={this.onDocumentComplete}
          onPageComplete={this.onPageComplete}
          page={this.state.page}
        />
        {pagination}
      </div>
    )
  }
}
*/

//MGR-PDF-VIEWER

import React, { Component } from 'react';
//import PDFSample from '../../assets/PDFSample.pdf'
import PDFViewer from 'mgr-pdf-viewer-react'
//import WebApiService from '../Service/WebApiService';
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
    constructor(props){
      super(props);
      const urlParams = new URLSearchParams(this.props.location.search)
      const key = urlParams.get('url');
      this.state = {
        url: key
      }
      this.props.ShowLoader();
      setTimeout(() => {this.props.HideLoader()},  1000);
    }
    render() {
    return (
        <PDFViewer document={{
            //file: PDFSample
            //url: "http://localhost:3000/events_pdf/1"
            url: this.state.url
        }} />
    );

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(PDF)