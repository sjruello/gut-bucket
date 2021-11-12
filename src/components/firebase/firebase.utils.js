import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const config = {
  apiKey: "AIzaSyCwv-evgKz34Quk0pleC2H6LbvYlTXNFyg",
  authDomain: "gnrc-db.firebaseapp.com",
  projectId: "gnrc-db",
  storageBucket: "gnrc-db.appspot.com",
  messagingSenderId: "349640186984",
  appId: "1:349640186984:web:25f9bc47d649e1a4a16fdd",
  measurementId: "G-GWMQS7JR13",
};

// take data from user object to store in our db:
export const createUserProfileDocument = async (userAuth, additionalData) => {
  // if userAuth does not exist, return:
  if (!userAuth) return;

  // get userID from firestore
  const userRef = firestore.doc(`users/${userAuth.uid}`);

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
  console.log(snapShot);
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

// gives us access to GoogleAuthProvider platform from auth library
const provider = new firebase.auth.GoogleAuthProvider();
// trigger google user prompt:
provider.setCustomParameters({ prompt: "select_account" });

// popup from firebase library:
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
