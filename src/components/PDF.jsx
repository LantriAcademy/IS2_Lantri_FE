import React, { Component } from 'react';
import PDFSample from '../assets/PDFSample.pdf'
import PDFViewer from 'mgr-pdf-viewer-react'

export default class PDF extends Component {
    render() {
    return (<PDFViewer document={{
        file: PDFSample,
        //url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf'
        //base64: ''
    }} />);
  }
}


/*export default class PDF extends Component {
    state = {
      numPages: null,
      pageNumber: 1,
    }
   
    onDocumentLoad = ({ numPages }) => {
      this.setState({ numPages });
    }
   
    render() {
      const { pageNumber, numPages } = this.state;
   
      return (
        <div className="text-center">
          <Document className="text-center"
            file= {PDFSample}
            onLoadSuccess={this.onDocumentLoad}
          >
            <Page pageNumber={pageNumber} />
          </Document>
          <p>Page {pageNumber} of {numPages}</p>
        </div>
      );
    }
  }*/