import React, { Component } from 'react';
import PDFSample from '../assets/PDFSample.pdf'
import PDFViewer from 'mgr-pdf-viewer-react'

export default class PDF extends Component {
    render() {
    return (
        <PDFViewer document={{
            //file: PDFSample
            url: 'https://arxiv.org/pdf/quant-ph/0410100.pdf'
            //base64: ''
        }} />);
  }
}
