import React, { useState, useEffect } from "react";
import { getVenues } from "../../firebase/firebase";
import "./trip-preview.styles.scss";

const TripPreview = ({ userID, tripID, tripVenues }) => {
  // const [venues, setVenues] = useState([]);

  if(!tripVenues) {
    return ""
  }

  return (
    <div>
      {tripVenues.length === 0 ? (
        <h2>No Venues Added!</h2>
      ) : (
        <div id="venue-box">
          {tripVenues.map((venue, index) => (
            <div className="mini-venue-card" key={index}>
              <span className="venue-title">{venue[1]}</span>
              <div
                className="thumbnail"
                style={{
                  backgroundImage: `url("${venue[3]}")`,
                }}
              ></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

}

export default TripPreview;