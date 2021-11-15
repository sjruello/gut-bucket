import firebase from "firebase/app";
import firebaseConfig from "./firebase.config";
import "firebase/firestore";
import "firebase/auth";
import {collection, doc, get} from "firebase/firestore";
  // getFirestore, doc, getDocFromCache, setDoc, updateDoc, addDoc, getDoc, getDocs 


// creates and initializes an instance of our Firebase application:
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore()
export const auth = firebase.auth();
export const firestore = firebase.firestore();

//GET functions

const getTable = (table) => {
  db.collection(table).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          console.log(doc._delegate._document.data.value.mapValue.fields);
      });
  });
}

getTable('users')

const getUserTrips = (userId) => {
  const getJohn = db.collection("users").doc(userId).collection("trips")
  getJohn.get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      console.log(doc._delegate._document.data.value.mapValue.fields)
    })
}).catch((error) => {
    console.log("Error getting document:", error);
});
}

getUserTrips("John")

const getVenues = (userId, tripId) => {
    const venues = db.collection("users").doc(userId).collection("trips").doc(tripId).collection("venues")
    venues.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc._delegate._document.data.value.mapValue.fields)
      })
  }).catch((error) => {
      console.log("Error getting document:", error);
  });
}

getVenues("John", "denver")
//POST functions

//Create a new trip
const newTrip = (userId, location, startDate = null, finishDate = null) => {
  const newTrip = db.collection("users").doc(userId).collection("trips")
  newTrip.doc().set({
    finishes: finishDate,
    starts: startDate,
    location: location
    })
}

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
