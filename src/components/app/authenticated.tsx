import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { FirebaseStream } from "../../services/FirebaseStream";
import { StreamContext } from "../stream";
import { AddStream } from "../add-stream";

export const Authenticated = ({
  userId,
  onSignOut,
}: {
  userId: string;
  onSignOut: () => void;
}) => (
  <StreamContext.Provider value={new FirebaseStream(userId)}>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add-stream">Add Stream</Link>
          </li>
          <li>
            <button type="button" onClick={onSignOut}>
              Sign Out
            </button>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/add-stream">
          <AddStream />
        </Route>
        <Route path="/">Welcome!</Route>
      </Switch>
    </div>
  </StreamContext.Provider>
);
