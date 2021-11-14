import React from "react";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import mapStyles from "./mapStyles";

import "./map.styles.scss";

// TODO: fix this
const Map = ({ location, zoomLevel }) => {
  const libraries = ["places"];
  const mapContainerStyle = {
    // width: '42vw',
    height: "600px",
  };
  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };
  const center = {
    lat: -37.813629,
    lng: 144.963058,
  };
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className="map">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
      ></GoogleMap>
    </div>
  );
};

export default Map;
