import React from "react";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';

import mapStyles from './mapStyles';
import "./map.styles.scss";
import "@reach/combobox/styles.css";

// Display Map
const Map = ({ location, zoomLevel }) => {

  const libraries = ["places"];
  const mapContainerStyle = {
    width: '42vw',
    height: '80vh',
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
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({lat, lng}) => {
    mapRef.current.panTo({lat, lng});
    mapRef.current.setZoom(18);
  }, []);

  if ( loadError ) return "Error loading Maps";
  if ( !isLoaded ) return "Loading Maps";

  return (
    <div className="map">

      <Search panTo={panTo} />

      <GoogleMap
        mapContainerStyle={ mapContainerStyle }
        zoom={ 12 }
        center={ center }
        options={ options }
        onLoad={ onMapLoad }
      ></GoogleMap>
    </div>
  );
};

// Search box component within map
function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: {status, data},
    setValue,
    clearSuggestions,
        } = usePlacesAutocomplete({
    requestOpetions: {
      location: { lat: () => -37.813629, lng: () => 144.963058, },
      radius: 15000,
    },
  });

  return (
    <div className='search'>
      <Combobox
        onSelect={ async (address) => {
          try {
            const results = await getGeocode({address});
            const {lat, lng} = await getLatLng(results[0]);
            panTo({ lat, lng });
          } catch(error) {
            console.log("error")
          }

          // console.log(address);
      }}
      >
        <ComboboxInput value={value}
          onChange={(e) => {
            setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder={"Enter an address"}
      />
        <ComboboxPopover>
          {status === 'OK' && data.map(({id, description}) => (
            <ComboboxOption key={id} value={description}/>
          ))}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default Map;
