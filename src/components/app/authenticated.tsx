import React from "react";
import { Switch, Route, Link } from "react-router-dom";

export const Authenticated = ({ onSignOut }: { onSignOut: () => void }) => (
  <div>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <button type="button" onClick={onSignOut}>
            Sign Out
          </button>
        </li>
      </ul>
    </nav>

    <Switch>
      <Route path="/">Welcome!</Route>
    </Switch>
  </div>
);
