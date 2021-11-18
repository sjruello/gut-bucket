import React from "react";
import { deleteVenue } from "../../firebase/firebase"
import "./trip-preview.styles.scss";

const TripPreview = ({tripVenues = null, userID, tripID, getVenues}) => {

  const killVenue = (uid, tripId, venueId) => {
    deleteVenue(uid, tripId, venueId).delete().then(() => getVenues(uid, tripId))
  }

  if (!tripVenues) {
    return "";
  }

  return (
    <div>
      {tripVenues.length === 0 ? (
        <p>{"None added, go find something!"}</p>
      ) : (
        <div id="venue-box">
          {tripVenues.map((venue, index) => (
            <div className="mini-venue-card" key={index}>
              <a href={venue[4]}><span className="venue-title">{venue[1]}</span></a>
              <div
                className="thumbnail"
                style={{
                  backgroundImage: `url("${venue[3]}")`,
                }}

              >
                
              </div>
              <button class="button-10" onClick={() => killVenue(userID, tripID, venue[0])}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripPreview;
