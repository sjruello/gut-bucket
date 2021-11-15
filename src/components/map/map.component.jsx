import React from "react";
import RoomIcon from "@mui/icons-material/Room";
// eslint-disable-next-line
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";

import mapStyles from "./mapStyles";
import "./map.styles.scss";
import "@reach/combobox/styles.css";

// Display Map
const Map = ({ location, zoomLevel }) => {
  const libraries = ["places"];
  const mapContainerStyle = {
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
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);
  }, []);

  const getPlaceDetails = function(response) {
    const place_id = response[0].place_id
    console.log(place_id);
    const GOOGLE_PLACE_DETAILS_URL = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${ place_id }&fields=name,opening_hours,website,price_level,rating&key=${ process.env.REACT_APP_GOOGLE_MAPS_API_KEY }&libraries=places`
    console.log(GOOGLE_PLACE_DETAILS_URL);
    const config = {
      method: 'get',
      url: GOOGLE_PLACE_DETAILS_URL,
      headers: { }
    };

  };

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className="map">
      <Search panTo={panTo} getPlaceDetails={getPlaceDetails}/>

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onLoad={onMapLoad}
      ></GoogleMap>
    </div>
  );
};

// Search box component within map
function Search({ panTo, getPlaceDetails }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => -37.813629, lng: () => 144.963058 },
      radius: 15000,
    },
  });

  return (
    <div className="search">
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions()

          try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
            console.log(results);
            getPlaceDetails(results);
          } catch (error) {
            console.log("error");
          }

          // console.log(address);
        }}
      >
        <div className="search-form">
          <ComboboxInput
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            disabled={!ready}
            placeholder={"Enter an address"}
          />
        </div>
        <ComboboxPopover>
        <ComboboxList>
          {status === "OK" &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default Map;
