import firebase from "firebase/app";
import firebaseConfig from "./firebase.config";
import "firebase/firestore";
import "firebase/auth";
// import {getFirestore, doc, getDocFromCache, setDoc, updateDoc, addDoc, getDoc, getDocs } from "firebase/firestore";


// creates and initializes an instance of our Firebase application:
firebase.initializeApp(firebaseConfig);
// const db = getFirestore();
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// Jonny trying shit out
// const getUser = async(id) => {

// // get a specific user record
// const docRef = doc(db, "users", id);
// const docSnap = await getDoc(docRef);

//   if (docSnap.exists()) {
//     console.log("Document data:", docSnap.data());
//   } else {
//     // doc.data() will be undefined in this case
//     console.log("No such document!");
//   }

// // get all documents from a collection
// }

// const getCollection = async(tabl) => {
//   const querySnapshot = await getDocs(collection(db, tabl));
//   querySnapshot.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
//   })
// }

// getUser("John") 
// getCollection("trips")

// Jonny trying shit out ends

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
