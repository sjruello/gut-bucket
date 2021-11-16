import React from "react";
import { Link } from "react-router-dom";
import TripVenueList from "../../components/trip-venue-list/trip-venue-list.component";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RestaurantIcon from "@mui/icons-material/Restaurant";
// firebase imports:
import { getUserTrips, getVenues } from "../../firebase/firebase";

// eslint-disable-next-line
// import { auth, createUserDocument } from "../../firebase/firebase.js";

import "./dashboard.styles.scss";

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
    expandIcon={<RestaurantIcon sx={{ fontSize: "1.5rem" }} color="primary" />}
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

export default function Dashboard({ currentUser }) {
  const [expanded, setExpanded] = React.useState("");
  console.log("dashboard user:", currentUser.id);

  // grab currentUser's trips
  getUserTrips(currentUser.id);

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const trips = getUserTrips("John")
  trips.forEach((trip) => {
    console.log(trip.location)
  })

  // TODO: generate Accordion forEach trip in db.
  return (
    <div className="main-container">
      <h2>{currentUser ? `${currentUser.displayName}'s Trips` : "Loading..."}</h2>
      <div className="trip-accordions">
        {/* something something
        {this.state.trips.map(({ id, ...otherSectionProps }) => (
          <Trip key={id} {...otherSectionProps} />
        ))} */}
        <TripAccordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
          <TripAccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography component={"span"} variant={"body2"}>
              Trip #1 - Melbourne
            </Typography>
          </TripAccordionSummary>
          <TripAccordionDetails>
            <Typography>
              <div className="trip-description">
                <p>A journey through the Melbourne CBD</p>
                <Link to="/trip/1">
                  <Button variant="contained">Open Trip</Button>
                </Link>
              </div>
              <TripVenueList />
            </Typography>
          </TripAccordionDetails>
        </TripAccordion>
        <TripAccordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
          <TripAccordionSummary aria-controls="panel2d-content" id="panel2d-header">
            <Typography component={"span"} variant={"body2"}>
              Trip #2 - Adelaide
            </Typography>
          </TripAccordionSummary>
          <TripAccordionDetails>
            <Typography component={"span"} variant={"body2"}>
              <div className="trip-description">
                <p>Adelaide CBD</p>
                <Link to="/trip/1">
                  <Button variant="contained">Open Trip</Button>
                </Link>
              </div>
              <TripVenueList />
            </Typography>
          </TripAccordionDetails>
        </TripAccordion>
      </div>
      {/* Add Trip Accordion: */}
      <div className="addtrip">
        <FormAccordion
          expanded={expanded === "formpanel"}
          onChange={handleChange("formpanel")}
        >
          <FormAccordionSummary aria-controls="formpaneld-content" id="formpaneld-header">
            <Typography component={"span"} variant={"body2"}>
              <h3 display="inline-block">
                {/* <AddCircleIcon fontSize="medium" /> */}
                Add a new trip
              </h3>
            </Typography>
          </FormAccordionSummary>
          <FormAccordionDetails>
            <Typography component={"span"} variant={"body2"}>
              <div className="venues-show">
                <p>
                  <TextField
                    id="outlined-basic"
                    label="Location Name"
                    variant="outlined"
                  />
                </p>
                <Link to="/trip/1">
                  <Button variant="contained">Create New Trip</Button>
                </Link>
              </div>
            </Typography>
          </FormAccordionDetails>
        </FormAccordion>
      </div>
    </div>
  );
}
