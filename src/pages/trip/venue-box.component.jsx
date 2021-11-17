import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { newVenue } from "../../firebase/firebase";
import { TripPreview } from "../../components/trip-preview/trip-preview.component";
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import "./venue-box.styles.scss";

export default function VenueBox(props) {
  // TODO: Make this work
  const addToTripList = (userId, tripId, name) => {
    console.log(userId, tripId, name);
    newVenue(userId, tripId, name);
    props.onClose(props.id)
    props.getVenues(userId, tripId)
  };

  return (
    <Card display='flex' sx={{ minWidth: 275 }}>
      <IconButton className='CloseIcon' onClick={()=>props.onClose(props.id)}>
        <CloseIcon />
      </IconButton>
      <CardContent >
        <Typography variant="h5" component="div">
          {props.venue.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Rating: {props.venue.rating}/5
        </Typography>
        <Typography variant="body2">
          {props.venue.address}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => window.open(props.venue.website)}>
        Website</Button>
        <Button onClick={() => addToTripList(props.userId, props.tripId, props.venue.name)}>Add Venue to TripList</Button>
      </CardActions>
    </Card>
  );
}
