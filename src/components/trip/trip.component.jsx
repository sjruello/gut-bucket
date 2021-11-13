import React from "react";

import "./trip.styles.scss";

class Trip extends React.Component {
  constructor() {
    super();
    this.state = { venues: [] };
  }

  render() {
    return (
      <div className="trip-main">
        <div className="venue-list">
          <h2>Venue List</h2>
          <ul>
            <li>Place 1</li>
            <li>Place 2</li>
          </ul>
        </div>
        <div className="map-display">
          <h2>Google Map View goes here</h2>
        </div>

        <div className="trip-venues-display">
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
