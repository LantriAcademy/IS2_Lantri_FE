import React, { Component } from 'react';
import { compose, withProps, lifecycle } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCNbejYW3U7cuGJpWAyUP1he5EPUjWf69Q",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        position: null,
        onMarkerMounted: ref => {
          refs.marker = ref;
        },

        onPositionChanged: () => {
          const position = refs.marker.getPosition();
          var lat = position.lat();
          var lng = position.lng();
          this.setState({lat: lat, lng: lng});
        }
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)((props) => 
  <GoogleMap
    defaultZoom={13}
    defaultCenter={props.defaultCenter}
  >
    <Marker onDragEnd={props.onDragEnd.bind(this, props.lat, props.lng)} ref={props.onMarkerMounted} onPositionChanged={props.onPositionChanged} draggable position={props.defaultCenter} />
  </GoogleMap>
)

export default class DraggableMap extends Component {
  
  render() {
    return (
      <MyMapComponent
        defaultCenter={this.props.defaultCenter}
        onDragEnd={this.props.onDragEnd}
      />
    );
  }
}