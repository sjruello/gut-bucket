import React, { useState, useEffect } from "react";
import { getVenues } from "../../firebase/firebase";
import "./trip-preview.styles.scss";

const TripPreview = ({ userID, tripID }) => {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    getVenues(userID, tripID)
      .get()
      .then((querySnapshot) => {
        const tripVenues = [];
        querySnapshot.forEach((doc) => {
          tripVenues.push([
            doc.id,
            doc.data().name,
            doc.data().address,
            doc.data().image,
          ]);
        });
        setVenues(tripVenues);
      });
  }, [userID, tripID]);

  return (
    <div>
      {venues.length === 0 ? (
        <h2>No Venues Added!</h2>
      ) : (
        <div id="venue-box">
          {venues.map((venue, index) => (
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
};

export default TripPreview;