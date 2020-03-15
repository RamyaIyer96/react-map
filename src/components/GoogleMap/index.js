import React from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
const mapStyles = {
  width: "100%",
  height: "100%"
};
class GoogleMap extends React.Component {
  render() {
    const { lat, lng, stations } = this.props;
    return (
      <Map
        google={this.props.google}
        zoom={5}
        style={mapStyles}
        center={{ lat, lng }}
      >
        {/*<Marker position={{ lat, lng }} />*/}
        {stations.map((station, index) => {
          return (
            <Marker
              key={index}
              name={station.name}
              position={{ lat: station.lat, lng: station.lng }}
            />
          );
        })}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_KEY
})(GoogleMap);
