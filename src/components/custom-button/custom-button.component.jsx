import React from "react";

import "./custom-button.styles.scss";

// pull children off props that are passed in to button
const CustomButton = ({ children, isGoogleSignIn, ...otherProps }) => (
  // button needs to trigger onSubmit method
  <button
    className={`${isGoogleSignIn ? "google-sign-in" : ""}  custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
