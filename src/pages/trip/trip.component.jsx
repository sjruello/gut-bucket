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
    this.onClose = this.onClose.bind(this);
  }

  saveVenues(details) {
    console.log( details.photos[0] );
    const { name, rating, website, formatted_address } = details;
    const venue = { name: name, rating: rating, website: website, address: formatted_address };
    this.setState(prevState => {
      return { venues: [...prevState.venues, venue] };
    });
  }

 // close the venue box
  onClose(index) {
    const venues = this.state.venues.filter((v, i) => i !== index )
    this.setState({venues: venues})
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
                onClose={ this.onClose }
                id={i}
              ></VenueBox>
            );
          })}
        </div>
        <div className="map-display">
          <Map saveVenues={this.saveVenues} tripID={this.state.tripID} userID={this.state.userID}/>
        </div>
        <div className="saved-venues">
          <p>List of saved venues:</p>
          <p>Trip ID: {this.props.tripID}</p>
          <TripPreview userID={this.props.currentUser.id} tripID={this.props.tripID} />
        </div>
      </div>
    );
  }
}

export default Trip;
