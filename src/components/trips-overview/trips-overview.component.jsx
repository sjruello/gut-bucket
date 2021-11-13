import React from "react";

import Trip from "../trip/trip.component";

import "./trips-overview.styles.scss";

class TripDirectory extends React.Component {
  constructor() {
    super();
    this.state = { trips: [] };
  }

  render() {
    return (
      <div className="trip-directory">
        <div className="trip-directory-menu">
          {/* pass in every key/value pair from sections with spread op */}
          {this.state.trips.map(({ id, ...otherSectionProps }) => (
            <Trip key={id} {...otherSectionProps} />
          ))}
        </div>
        <div className="add-new-trip">
          {/* link to new-trip-form and render below/above */}
          <h2>Add a new trip</h2>
        </div>
      </div>
    );
  }
}

export default TripDirectory;
