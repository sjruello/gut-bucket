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
    auth.onAuthStateChanged((user) => {
      createUserProfileDocument(user);

      console.log(user);
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
