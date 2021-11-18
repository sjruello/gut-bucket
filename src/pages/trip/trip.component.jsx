import React from "react";
import TripPreview from "../../components/trip-preview/trip-preview.component";
import Map from "../../components/map/map.component";
import VenueBox from "./venue-box.component";
import { getVenues } from "../../firebase/firebase";
import "./trip.styles.scss";

class Trip extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tripID: "",
      venues: [],
      lastAdded: "",
      tripVenues: [],
    };
    this.saveVenues = this.saveVenues.bind(this);
    this.lastAdded = this.lastAdded.bind(this);
    this.onClose = this.onClose.bind(this);
    this.setTripId = this.setTripId.bind(this);
  }

  saveVenues(details) {
    console.log(details.photos[0]);
    const { name, rating, website, formatted_address } = details;
    const venue = {
      name: name,
      rating: rating,
      website: website,
      address: formatted_address,
    };
    this.setState((prevState) => {
      return { venues: [...prevState.venues, venue] };
    });
  }

  setTripId(tripId) {
    this.setState({ tripID: tripId });
  }

  lastAdded(name) {
    this.setState({ lastAdded: name });
  }

  getVenues = (userId, tripId) => {
    getVenues(userId, tripId)
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
        this.setState({ tripVenues: tripVenues });
      });
  };

  componentDidMount() {
    this.setState({ tripID: this.props.tripID });
    this.getVenues(this.props.currentUser.id, this.props.tripID);
  }
  // close the venue box

  onClose(index) {
    const venues = this.state.venues.filter((v, i) => i !== index);
    this.setState({ venues: venues });
  }

  render() {
    return (
      <div className="container">
        <div className="map-list">
          <p>Map List</p>
          {this.state.venues.map((v, i) => {
            return (
              <VenueBox
                key={i}
                venue={this.state.venues[i]}
                userId={this.props.currentUser.id}
                tripId={this.props.tripID}
                venueAdded={this.lastAdded}
                onClose={this.onClose}
                getVenues={this.getVenues}
                id={i}
              ></VenueBox>
            );
          })}
        </div>
        <div className="map-display">
          <Map saveVenues={this.saveVenues} tripID={this.props.tripID} userID={this.props.currentUser.id}/>
        </div>
        <div className="saved-venues">
          <p>List of saved venues:</p>
          <p>Trip ID: {this.props.tripID}</p>
          <TripPreview userID={this.props.currentUser.id}
          tripID={this.props.tripID} tripVenues={this.state.tripVenues} />
        </div>
      </div>
    );
  }
}

export default Trip;
