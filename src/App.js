import React, { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import Dashboard from "./pages/dashboard/dashboard.component";
import Trip from "./pages/trip/trip.component";

// firebase imports:
import { auth, createUserDocument } from "./firebase/firebase";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentUser: null };
  }

  unsubscribeFromAuth = null;

  //React lifecycle method: check if user is signed in:
  componentDidMount() {
    // unsubscribeFromAuth is reassigned to the return value of calling auth.onAuthStateChanged().
    // this method returns another method: firebase.unsubscribe().
    // docs here: https://firebase.google.com/docs/reference/js/firebase.auth.Auth#returns-firebase.unsubscribe
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserDocument(userAuth); // returned from firebase.utils.

        // snapShot object allow us to get properties on object with .data() - JSON object
        userRef.onSnapshot((snapShot) => {
          // get new object with all user properties we want:
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data(),
            },
          });
        });
      }
      this.setState({ currentUser: userAuth });
    });
  }

  // when unsubscribeFromAuth() is called inside the componentWillUnmount,
  // it now has the value of firebase.unsubscribe(), which executes, closing the session.
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        {/* Keep Header present always - on top of Routes  */}
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route exact path="/" element={<SignInAndSignUpPage />} />
          <Route path="/signin" element={<SignInAndSignUpPage />} />
          <Route
            path="/dashboard"
            element={<Dashboard currentUser={this.state.currentUser} />}
          />
          <Route
            path="/trip/:tripID"
            element={<Trip currentUser={this.state.currentUser} />}
          />
        </Routes>
      </div>
    );
  }
}

export default App;
