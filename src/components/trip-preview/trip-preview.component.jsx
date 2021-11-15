import React from "react";

import "./trip-preview.styles.scss";

const TripVenueList = ({ tripID, venueImg }) => (
  <div id="venue-box">
    {/* // forEach venue in db/trips: generate small preview card*/}
    <div className="mini-venue-card">
      <span>Venue #1</span>
      <img src="http://lorempixel.com/400/400/nightlife/" alt="" />
    </div>
    <div className="mini-venue-card">
      <span>Venue #2</span>
      <img src="http://lorempixel.com/500/500/nightlife/" alt="" />
    </div>
    <div className="mini-venue-card">
      <span>Venue #3</span>
      <img src="http://lorempixel.com/300/300/nightlife/" alt="" />
    </div>
  </div>
);

export default TripVenueList;
