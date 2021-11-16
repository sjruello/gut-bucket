import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function VenueBox(props) {

 // TODO: Make this work
  const addToTripList = () => {
    console.log('Database stuff');
  }

  // const _openWebsite = () => {
  //   window.open(, '_blank')
  // }


  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography variant="h5" component="div">
          {props.venue.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Rating: {props.venue.rating}/5
        </Typography>
        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque facilis, debitis quam quo sint aliquam, temporibus quaerat nam numquam unde odit mollitia suscipit id, repellat libero nostrum laboriosam magni reiciendis.
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => window.open(props.venue.website)}>Website</Button>
        <Button onClick={addToTripList}>Add Venue to TripList</Button>
      </CardActions>
    </Card>
  );
}
