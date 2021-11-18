import React, { useState } from "react";
import RoomIcon from "@mui/icons-material/Room";
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng , getDetails } from "use-places-autocomplete";
import { getUserTrip } from "../../firebase/firebase"
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
const Map = (props) => {
  const [ center, setCenter ] = useState({ lat: -37.813629, lng: 144.963058})

  const libraries = ["places"];

  const mapContainerStyle = {
    height: "600px",
  };

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
    getCityLatLng();
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(16);
  }, []);

  async function getCityLatLng() {
    const location = await getUserTrip( props.userID, props.tripID )
    const parameter = { address: location }
    const geocode = await getGeocode(parameter)
    const cityLatLng = await getLatLng(geocode[0])
    setCenter({lat: cityLatLng.lat, lng: cityLatLng.lng})
  }

  if (loadError) return "Error loading Maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className="map">
      <Search saveVenues={ props.saveVenues } panTo={ panTo } center={ center } />
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
function Search( { panTo, saveVenues, center } ) {

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => center.lat, lng: () => center.lng },
      radius: 15000,
    },
  });

  return (
    <div className="search">
      <Combobox
        onSelect={async (address) => {
          setValue(address, false);
          clearSuggestions();

          try {
            const results = await getGeocode({ address });

            const { lat, lng } = await getLatLng(results[0]);

            const places_parameters = {
              placeId: results[0].place_id,
              fields: ["name", "opening_hours", "price_level", "rating", "website", "photo", "formatted_address"]
            };

            getDetails(places_parameters)
            .then((details) => {
              console.log("Details: ", details)
              saveVenues(details);
              panTo({ lat, lng });
            })
            .catch((error) => {
              console.log(error);
            })

          } catch (error) {
            console.log("error");
          }
        }}
      >
        <div className="search-form">
          <ComboboxInput
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
            }}
            disabled={!ready}
            placeholder={"Where would you like to go?"}
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
