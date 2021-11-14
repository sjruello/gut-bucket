import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/gutbucket-logo.svg";
import { auth } from "../../firebase/firebase.js";

import "./header.styles.scss";

const Header = ({ currentUser }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/">
        DASHBOARD
      </Link>
      <Link className="option" to="/">
        ABOUT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT {currentUser.displayName}
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);

export default Header;
