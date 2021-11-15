{
  /* ////////////////////////////////////////////////// */
}
<TripAccordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
  <TripAccordionSummary aria-controls="panel1d-content" id="panel1d-header">
    <Typography component={"span"} variant={"body"}>
      {allTrips.map((trip, index) => (
        <h2>{trip[index]}</h2>
      ))}
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
</TripAccordion>;
{
  /* /////////////////////////////////////////////////// */
}
{
  /* Add Trip Accordion: */
}
//   <div className="addtrip">
//     <FormAccordion
//       expanded={expanded === "formpanel"}
//       onChange={handleChange("formpanel")}
//     >
//       <FormAccordionSummary aria-controls="formpaneld-content" id="formpaneld-header">
//         <Typography component={"span"} variant={"body2"}>
//           <h3 display="inline-block">
//             {/* <AddCircleIcon fontSize="medium" /> */}
//             Add a new trip
//           </h3>
//         </Typography>
//       </FormAccordionSummary>
//       <FormAccordionDetails>
//         <Typography component={"span"} variant={"body2"}>
//           <div className="venues-show">
//             <p>
//               <TextField id="outlined-basic" label="Location Name" variant="outlined" />
//             </p>
//             <Link to="/trip/1">
//               <Button variant="contained">Create New Trip</Button>
//             </Link>
//           </div>
//         </Typography>
//       </FormAccordionDetails>
//     </FormAccordion>
//   </div>
// </div>;
