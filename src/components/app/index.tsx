import React, { useEffect, useState } from "react";
import { Switch, Route, Link } from "react-router-dom";
import { useAuth } from "../auth";
import "./app.css";

export const App = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    if (!auth) {
      return;
    }

    return auth.onAuthStateChanged((authenticated) => {
      setLoading(false);
      setIsAuthenticated(authenticated);
    });
  }, [auth]);

  return (
    <div className="container">
      <header>
        <h1>Annex</h1>
        <h2>Append Only Micro Blogs</h2>
      </header>
      <main>
        {loading && <span>Loading...</span>}
        {!loading && (
          <>
            {!isAuthenticated && (
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
            )}
            {isAuthenticated && (
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
            )}
          </>
        )}
      </main>
    </div>
  );
};
