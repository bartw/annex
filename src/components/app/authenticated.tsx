import React from "react";
import { Switch, Route, Link } from "react-router-dom";

export const Authenticated = () => (
  <div>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/sign-out">Sign Out</Link>
        </li>
      </ul>
    </nav>

    <Switch>
      <Route path="/sign-out">Sign Out</Route>
      <Route path="/">Welcome!</Route>
    </Switch>
  </div>
);
