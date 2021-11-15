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
  const [trips, setTrips] = React.useState([]);

  // grab currentUser's trips
  getUserTrips(currentUser.id)
    .get()
    .then((querySnapshot) => {
      const allTrips = [];
      querySnapshot.forEach((doc) => {
        allTrips.push(doc.data().location);
      });
      setTrips(allTrips);
    });
  // console.log("trips:", allTrips);

  // const handleChange = (panel) => (event, newExpanded) => {
  //   setExpanded(newExpanded ? panel : false);
  // };

  // TODO: generate Accordion forEach trip in db.
  return (
    <div className="main-container">
      <h2>{currentUser ? `${currentUser.displayName}'s Trips` : "Loading..."}</h2>
      {trips.map((trip) => (
        <h2>{trip}</h2>
      ))}
      {/* {trips.join("")} */}
    </div>
  );
}
