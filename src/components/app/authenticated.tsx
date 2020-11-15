import React from "react";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import { FirebaseStream } from "../../services/FirebaseStream";
import { Button } from "../button";
import { StreamContext } from "../stream";
import { Dashboard } from "../dashboard";
import { AddStream } from "../add-stream";

export const Authenticated = ({
  userId,
  onSignOut,
}: {
  userId: string;
  onSignOut: () => void;
}) => (
  <StreamContext.Provider value={new FirebaseStream(userId)}>
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/add-stream" exact>
            Add Stream
          </NavLink>
        </li>
        <li>
          <Button onClick={onSignOut}>Sign Out</Button>
        </li>
      </ul>
    </nav>
    <main>
      <Switch>
        <Route path="/add-stream" exact>
          <AddStream />
        </Route>
        <Route path="/" exact>
          <Dashboard />
        </Route>
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    </main>
  </StreamContext.Provider>
);
