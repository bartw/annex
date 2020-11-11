import React from "react";
import { Switch, Route, Link } from "react-router-dom";

export const Anonymous = () => (
  <div>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/sign-up">Sign Up</Link>
        </li>
        <li>
          <Link to="/sign-in">Sign In</Link>
        </li>
      </ul>
    </nav>

    <Switch>
      <Route path="/sign-up">Sign Up</Route>
      <Route path="/sign-in">Sign In</Route>
      <Route path="/">Home</Route>
    </Switch>
  </div>
);
