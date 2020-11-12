import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { SignUp } from "../sign-up";
import { SignIn } from "../sign-in";

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
      <Route path="/sign-up">
        <SignUp />
      </Route>
      <Route path="/sign-in">
        <SignIn />
      </Route>
      <Route path="/">Home</Route>
    </Switch>
  </div>
);
