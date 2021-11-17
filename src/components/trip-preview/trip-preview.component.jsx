import React, { useState, useEffect } from "react";
import { getVenues } from "../../firebase/firebase";
import "./trip-preview.styles.scss";

const TripPreview = ({ userID, tripID, tripVenues }) => {
  // const [venues, setVenues] = useState([]);

  // useEffect(() => {
  //   getVenues(userID, tripID)
  //     .get()
  //     .then((querySnapshot) => {
  //       const tripVenues = [];
  //       querySnapshot.forEach((doc) => {
  //         tripVenues.push([
  //           doc.id,
  //           doc.data().name,
  //           doc.data().address,
  //           doc.data().image,
  //         ]);
  //       });
  //       setVenues(tripVenues);
  //     });
  // }, []);
  if(!tripVenues) {
    return ""
  }

  return (
    <div id="venue-box">
      {/* // forEach venue in db/trips: generate small preview card*/}
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
  );
};

export default TripPreview;