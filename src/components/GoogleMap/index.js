import React from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
const mapStyles = {
  width: '100%',
  height: '100%'
};
class GoogleMap extends React.Component {
  render() {
    const { lat, lng } = this.props;
    return (
      <Map
        google={this.props.google}
        zoom={8}
        style={mapStyles}
        center={{ lat, lng }}
      >
        <Marker position={{ lat, lng }} />
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDB0ZGHZHLI4o5Bqjmbi_VJ0MwBApV-Gd0'
})(GoogleMap);
