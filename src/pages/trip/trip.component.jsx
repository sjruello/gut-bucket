import React from "react";

import Map from "../../components/map/map.component";
// import {
//   Combobox,
//   ComboboxInput,
//   ComboboxPopover,
//   ComboboxList,
//   ComboboxOption,
// } from "@reach/combobox";

import "./trip.styles.scss";

class Trip extends React.Component {
  constructor() {
    super();
    this.state = { venues: [] };
  }

  render() {
    return (
      <div className="container">
        <div className="map-list">
          <p>Map List</p>
        </div>
        <div className="map-display">
          <Map />
        </div>
        <div className="saved-venues">
          List of saved venues:
          {/* display all venues selected for particular trip */}
          {/* pass in every key/value pair from sections with spread */}
          {this.state.venues.map(({ id, ...otherSectionProps }) => (
            <Trip key={id} {...otherSectionProps} />
          ))}
        </div>
      </div>
    );
  }
}

export default Trip;
