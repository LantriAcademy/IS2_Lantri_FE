import React, { Component } from 'react';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBSK3uZLHPEGHd68JImFbmjcxhvd8KbFyw",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={13}
    defaultCenter={props.defaultCenter}
  > 
    <Marker position={props.defaultCenter}/>
  </GoogleMap>
)


export default class Map extends Component {
  
  render() {
    return (
      <MyMapComponent
        defaultCenter={this.props.defaultCenter}
      />
    );
  }
}