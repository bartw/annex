import React from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import { SignUp } from "../sign-up";
import { SignIn } from "../sign-in";

export const Anonymous = () => (
  <div>
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-in" exact>
            Sign In
          </NavLink>
        </li>
      </ul>
    </nav>
    <main>
      <Switch>
        <Route path="/sign-up" exact>
          <SignUp />
        </Route>
        <Route path="/sign-in" exact>
          <SignIn />
        </Route>
        <Route path="/" exact>
          <h3>Home</h3>
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </main>
  </div>
);
