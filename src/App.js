import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import Dashboard from "./pages/dashboard/dashboard.component";
// import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";

// passed from firebase.utils:
import { auth, createUserProfileDocument } from "./components/firebase/firebase.utils.js";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { currentUser: null };
  }

  unsubscribeFromAuth = null;

  //life cycle methods:
  //check if user is signed in
  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth); // returned from firebase.utils.

        // snapShot object allow us to get properties on object with .data() - JSON object
        userRef.onSnapshot((snapShot) => {
          // console.log(snapShot);
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

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        {/* Keep Header present always - on top of Routes  */}
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route path="/signin" element={<SignInAndSignUpPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
