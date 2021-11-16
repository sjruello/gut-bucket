import firebase from "firebase/app";
// import firebaseConfig from "./firebase.config";
import "firebase/firestore";
import "firebase/auth";
// import { collection, doc, get } from "firebase/firestore";

// creates and initializes an instance of our Firebase application:
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FB_API,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FB_ID,
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//GET functions

const getUsers = () => {
  db.collection("users")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.id);
      });
    });
};

export const getUserTrips = (userId) => {
  const getTrips = db.collection("users").doc(userId).collection("trips");
  return getTrips;
};


export const getVenues = (userId, tripId) => {
  const getVenues = db
    .collection("users")
    .doc(userId)
    .collection("trips")
    .doc(tripId)
    .collection("venues");

  return getVenues;
  // venues
  //   .get()
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       console.log(doc._delegate._document.data.value.mapValue.fields);
  //     });
  //   })
  //   .catch((error) => {
  //     console.log("Error getting document:", error);
  //   });
};

// getVenues("John", "denver");
//POST functions

//Create a new trip
export const newTrip = (userId, location, startDate = null, finishDate = null) => {
  const newTrip = db.collection("users").doc(userId).collection("trips");
  newTrip.doc().set({
    finishes: finishDate,
    starts: startDate,
    location: location,
  });
};

// newTrip("John", "New York", '10/10/2022', '31/10/2022')

// gives us access to GoogleAuthProvider platform from auth library
const provider = new firebase.auth.GoogleAuthProvider();
// trigger google user prompt:
provider.setCustomParameters({ prompt: "select_account" });
// popup from firebase library:
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// take data from user object to store in our db:
export const createUserDocument = async (userAuth, additionalData) => {
  // if user does not exist, return:
  if (!userAuth) return;

  // get userID from firestore queryReference object
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  // const querySnapshot = await getDocs(collection(db, "trips"));
  // querySnapshot.forEach((doc) => {
  //   console.log(`${doc.id} => ${doc.data()}`);
  // });

  // get snapShot using .get(), async function - use await
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    //try/catch block for async request to store user data:
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  // Firestore library either return a reference or a snapshot object.
  // of these, they can be either document or collection versions.
  // console.log(snapShot);
  return userRef;
};

export default firebase;
