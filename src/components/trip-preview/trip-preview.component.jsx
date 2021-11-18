import React from "react";

import "./trip-preview.styles.scss";

const TripPreview = ({ tripVenues = null }) => {
  //  userID, tripID,
  // const [venues, setVenues] = useState([]);

  // useEffect(() => {
  //   getVenues(userID, tripID)
  //     .get()
  //     .then((querySnapshot) => {
  //       let tripVenues = [];
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
  // }, [userID, tripID]);

  if (!tripVenues) {
    return "";
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
};

export default TripPreview;
