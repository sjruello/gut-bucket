import React from "react";
import { Link } from "react-router-dom";
import TripPreview from "../../components/trip-preview/trip-preview.component";
// MUI imports:
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RestaurantIcon from "@mui/icons-material/Restaurant";

// Firebase imports:
import { getUserTrips, newTrip, deleteTrip, getVenues } from "../../firebase/firebase";

import "./dashboard.styles.scss";
import "../../components/form-input/form-input.styles.scss";

const TripAccordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const TripAccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<RestaurantIcon sx={{ fontSize: "2.4rem" }} color="primary" />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const TripAccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const FormAccordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const FormAccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<AddCircleIcon sx={{ fontSize: "2.9rem" }} color="primary" />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(255, 255, 255, .05)" : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const FormAccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expanded: "",
      trips: [],
      location: "",
      description: "",
      userTrips: [],
      tripVenues: [],
      currentUser: this.props.currentUser,
    };

    this.handleChange = this.handleChange.bind(this);
    this.setLocation = this.setLocation.bind(this);
  }

  handleChange = (panel) => (event, newExpanded) => {
    this.setState({ expanded: newExpanded ? panel : false });
  };

  setLocation = (event) => {
    this.setState({ location: event.target.value });
  };

  setDescription = (event) => {
    this.setState({ description: event.target.value });
  };

  getUserTrips = () => {
    getUserTrips(this.state.currentUser.id)
      .get()
      .then((querySnapshot) => {
        const userTrips = [];
        querySnapshot.forEach((doc) => {
          userTrips.push([doc.id, doc.data().location, doc.data().description]);
        });
        this.setState({ userTrips: userTrips });
      });
  };

  deleteTrip = (userId, tripId) => {
    deleteTrip(userId, tripId)
      .delete()
      .then(() => this.getUserTrips());
  };

  handleSubmit = (event) => {
    event.preventDefault();
    newTrip(this.state.currentUser.id, this.state.location, this.state.description);
    this.setState({ location: "", description: "", trips: this.getUserTrips() });
  };

  componentDidUpdate() {
    if (!this.props.currentUser || this.state.userTrips.length) {
      return;
    }
    getUserTrips();
  }

  handleSubmit = (event) => {
    event.preventDefault();
    newTrip(this.state.currentUser.id, this.state.location, this.state.description);
    this.setState({ location: "", description: "", trips: this.getUserTrips() });
  };

  componentDidMount() {
    this.getUserTrips();
  }

  render() {
    return (
      <div className="main-container">
        <div className="trip-accordions">
          <h2>
            {this.props.currentUser
              ? `${this.props.currentUser.displayName
                  .split(" ")
                  .slice(0, -1)
                  .join(" ")}'s Trips`
              : "No User Found "}
          </h2>
          {this.state.userTrips.map((trip, index) => (
            <TripAccordion
              expanded={this.state.expanded === `panel${index}`}
              onChange={this.handleChange(`panel${index}`)}
              key={trip[0]}
              component={"span"}
            >
              <TripAccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                <Typography component={"span"} variant={"body"}>
                  <div className="trip-header">
                    <h3>{trip[1]}</h3>
                  </div>
                </Typography>
              </TripAccordionSummary>
              <TripAccordionDetails component={"span"}>
                <Typography component={"span"}>
                  <div className="trip-description">
                    <p>{trip[2]}</p>
                    <Link
                      to={{
                        pathname: `/trip/${trip[0]}`,
                        state: { tripID: trip[0] },
                      }}
                      onClick={() => {
                        this.props.getTrip(trip[0]);
                      }}
                    >
                      <h4>{trip[1]}</h4>
                      <Button variant="contained">Open Trip</Button>
                    </Link>{" "}
                    <Button
                      variant="contained"
                      onClick={() => {
                        this.deleteTrip(this.state.currentUser.id, trip[0]);
                      }}
                    >
                      Delete Trip
                    </Button>
                  </div>
                  <TripPreview tripVenues={this.state.tripVenues} />
                </Typography>
              </TripAccordionDetails>
            </TripAccordion>
          ))}
          {/* /////////////////// Form Accordion //////////////////////// */}
          <div className="addtrip">
            <FormAccordion
              expanded={this.state.expanded === "formpanel"}
              onChange={this.handleChange("formpanel")}
            >
              <FormAccordionSummary
                aria-controls="formpaneld-content"
                id="formpaneld-header"
              >
                <Typography component={"span"} variant={"body"}>
                  <h3 display="inline-block">Add a new trip</h3>
                </Typography>
              </FormAccordionSummary>
              <FormAccordionDetails>
                <Typography component={"span"} variant={"body"}>
                  <div className="venues-show">
                    <TextField
                      label="Location Name"
                      id="outlined-basic"
                      value={this.state.location}
                      variant="outlined"
                      onChange={this.setLocation}
                    />
                    <p></p>
                    <TextField
                      label="Description"
                      id="outlined-basic"
                      value={this.state.description}
                      variant="outlined"
                      onChange={this.setDescription}
                    />
                    <p></p>
                    <Button onClick={this.handleSubmit} variant="contained">
                      Create New Trip
                    </Button>
                  </div>
                </Typography>
              </FormAccordionDetails>
            </FormAccordion>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
