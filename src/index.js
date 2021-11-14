import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
//redux attempt /////////////////
// import { Provider } from "react-redux/src";
// import { ReactReduxFirebaseProvider } from "react-redux-firebase";
// import { createFirestoreInstance } from "redux-firestore";
// import { createStore } from "redux";
// import rootReducer from "./reducers/index";
// import firebase from "./firebase/firebase";
////////////////////////////////

// const store = createStore(rootReducer);

// const rrfProps = {
//   firebase,
//   config: {
//     userProfile: "users",
//   },
//   dispatch: store.dispatch,
//   createFirestoreInstance,
// };

// initialised Firebase with our unique Firebase config, set it up to use Firestore,
// and then exported it to make it available elsewhere in our application -
// specifically, our entry point file.
// This gets passed into rrfProps:
ReactDOM.render(
  // <Provider store={store}>
  //   <ReactReduxFirebaseProvider {...rrfProps}>
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  //   </ReactReduxFirebaseProvider>
  // </Provider>,
  document.getElementById("root")
);
