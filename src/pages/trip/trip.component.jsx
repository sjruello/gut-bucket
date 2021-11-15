import React from "react";
import TripVenueList from "../../components/trip-venue-list/trip-venue-list.component";
import Map from "../../components/map/map.component";

import "./trip.styles.scss";

class Trip extends React.Component {
  constructor() {
    super();
    this.state = {
      venues: []
    };
    this.saveVenues = this.saveVenues.bind(this);
  }
  //TODO: fix this shit
  saveVenues(details) {
    console.log('This is called from trip.component', details);
    const { name, rating, website } = details;
    const venue = { name: name, rating: rating, website: website };
    console.log(this.state.venues)
    this.setState(prevState => {
      return { venues: [...prevState.venues, venue] };
    })
  }

  render() {
    return (
      <div className="container">
        <div className="map-list">
          {/* {TODO: turn this into cards} */}
          <p>Map List</p>
            {this.state.venues.map(v => {
              return <p key={v.name}>{v.name} - {v.website}</p>
            })}
        </div>
        <div className="map-display">
          <Map saveVenues={this.saveVenues}/>
        </div>
        <div className="saved-venues">
          <p>List of saved venues:</p>
          {/* display all venues selected for particular trip */}
          {/* pass in every key/value pair from sections with spread */}
          {/* {this.state.venues.map(({ id, ...otherSectionProps }) => (
            <Trip key={id} {...otherSectionProps} />
          ))} */}
          <TripVenueList />
        </div>
      </div>
    );
  }
}

export default Trip;
