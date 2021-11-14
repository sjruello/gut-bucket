import React from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

export default function Map() {

  const libraries = ["places"];
  const mapContainerStyle = {
    width: '100vw',
    height: '100vh',
  };

  const center = {
    lat: 37.813629,
    long: 144.963058,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  if ( loadError ) return "Error loading Maps";
  if ( !isLoaded ) return "Loading Maps";



  return (
    <div>
      <GoogleMap mapContainerStyle={ mapContainerStyle } zoom={ 8 } center={ center }></GoogleMap>
    </div>
  )
}