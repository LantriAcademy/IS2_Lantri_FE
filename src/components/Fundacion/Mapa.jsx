import React, { Component } from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCNbejYW3U7cuGJpWAyUP1he5EPUjWf69Q",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={13}
    center={props.defaultCenter}
  > 
    <Marker position={props.defaultCenter}/>
  </GoogleMap>
)


export default class Mapa extends Component {
  
  render() {
    return (
      <MyMapComponent
        defaultCenter={this.props.defaultCenter}
      />
    );
  }
}