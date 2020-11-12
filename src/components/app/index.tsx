import React, { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { Anonymous } from "./anonymous";
import "./app.css";
import { Authenticated } from "./authenticated";

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
        {(!auth || loading) && <span>Loading...</span>}
        {auth && !loading && (
          <>
            {!isAuthenticated && <Anonymous />}
            {isAuthenticated && <Authenticated onSignOut={auth.signOut} />}
          </>
        )}
      </main>
    </div>
  );
};
