import React from "react";
import { Link } from "react-router-dom";

import "./dashboard.styles.scss";

const Dashboard = () => (
  <div className="homepage">
    <h2>MY TRIPS</h2>
    <Link className="option" to="/trip/1">
      MELBOURNE 12-12-2021
    </Link>
  </div>
);

export default Dashboard;
