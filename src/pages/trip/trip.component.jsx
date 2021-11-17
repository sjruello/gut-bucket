import React from "react";
import TripPreview from "../../components/trip-preview/trip-preview.component";
import Map from "../../components/map/map.component";
import VenueBox from "./venue-box.component";
import "./trip.styles.scss";

class Trip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripID: "",
      venues: [],
    };
    this.saveVenues = this.saveVenues.bind(this);
  }

  //TODO: fix this shit
  saveVenues(details) {
    console.log(details.photos[0]);
    const { name, rating, website } = details;
    const venue = { name: name, rating: rating, website: website };
    this.setState((prevState) => {
      return { venues: [...prevState.venues, venue] };
    });
  }

  componentDidMount() {
    console.log("trip ID:", this.props.tripID);
  }

  render() {
    return (
      <div className="container">
        <div className="map-list">
          {/* {TODO: turn this into cards} */}
          <p>Map List</p>
          {this.state.venues.map((v, i) => {
            return (
              <VenueBox
                key={i}
                venue={this.state.venues[i]}
                userId={this.props.currentUser.id}
                tripId={this.props.tripID}
              ></VenueBox>
            );
          })}
        </div>
        <div className="map-display">
          <Map saveVenues={this.saveVenues} />
        </div>
        <div className="saved-venues">
          <p>List of saved venues:</p>
          <p>Trip ID: {this.props.tripID}</p>
          <TripPreview />
        </div>
      </div>
    );
  }
}

export default Trip;
