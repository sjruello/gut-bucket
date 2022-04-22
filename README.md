# gutBucket

> Live demo [_here_](https://gutbucket-3-rappin-boogalee.web.app/).

## General Information

Planning a trip? Save a venue wishlist for your upcoming travels.

Project 2 for General Assembly Software Engineering Immersive 48.

This was a group project demonstrating the full-stack knowledge gained in the last 8 weeks of class.

## Technologies Used

- React v17
- React Router v6
- Google Firebase Authentication
- Google Firestore Database
- Google Maps/Places API
- Deployed via Google Firebase Hosting
- MUI (Material UI)

## Features

- User authentication with name/email or Google Authentication.
- Create and save trip locations, add relevant venues inside.
- Search for venues using Google Places database.

## Wire Frames

Login Page:
![Login Page](https://res.cloudinary.com/dydsfpahp/image/upload/v1637204775/Project-2/gutbucket-root_uxchi6.png)

Inside Trip:
![Inside Trip](https://res.cloudinary.com/dydsfpahp/image/upload/v1637204776/Project-2/gutbucket-insidetrip_tvoiuw.png)

Show Venue:
![Show Venue](https://res.cloudinary.com/dydsfpahp/image/upload/v1637204776/Project-2/gutbucket-showvenue_u4yixc.png)

Show Trip Notes:
![Show Notes](https://res.cloudinary.com/dydsfpahp/image/upload/v1637204776/Project-2/gutbucket-shownotes_ouk7xt.png)

Add/Edit Trip:
![Add Edit Trip](https://res.cloudinary.com/dydsfpahp/image/upload/v1637204775/Project-2/gutbucket-addedittrip_atjf7t.png)

Models:
![Models](https://res.cloudinary.com/dydsfpahp/image/upload/v1637205878/Project-2/miro_models_vnivvt.png)

Pages & Component Plan:
![Components](https://res.cloudinary.com/dydsfpahp/image/upload/v1637205878/Project-2/Miro_components_nw7em9.png)

User Flow:
![User Flow](https://res.cloudinary.com/dydsfpahp/image/upload/v1637205878/Project-2/Miro_userflow_zuklia.png)

## Project Status: _Work in Progress_

## Room for Improvement

This project presented many challenges, as we were mostly unfamiliar with all 3 technologies implemented (React, Googles Places API, Firebase/FireStore), and we were a little too ambitious with what we could achieve in a week. However - we had a good crack at it, and learnt a lot along the way!

We became very familiar with noSQL databases, the importance of knowing your package versions, nesting data, splitting functions up, async functions...and how unintentional recursion can cause you to blow through 3 free Firestore database read quotas in a day. 🙈

React Router and Firebase both had recent major updates which presented challenges for working with documentation.
If we were to restart this project, we would use React functional components almost entirely, as React Router v6 uses Hooks exclusively.

## Room for improvement:

- React Router components need to be reconfigured, currently does not redirect on signin.
- Implement Firebase v9
- Architecture of components in React

## To do:

- Google Places venue query returns a photo
- Notes function for trips and venues
- Expansion of venue info stored in the Database
- User profiles and achievements
- Dates for trip
- Ability to allocate venues into specific timeslots (e.g particular venue for lunch, dinner etc)
- Venue reviews
- Sharing trips between users

## Acknowledgements

- Many thanks to Joel, Rowena and Pat.

## Contributors

- [Alex Poulsen](https://github.com/agpoulsen)
- [Sarah Ruello](https://github.com/sarahjune85)
- [Jonathan Wermut](https://github.com/jzwermut)
