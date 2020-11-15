import React, { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { Anonymous } from "./anonymous";
import "./app.css";
import { Authenticated } from "./authenticated";

export const App = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) {
      return;
    }

    return auth.onAuthStateChanged((authenticated) => {
      setLoading(false);
      setUserId(authenticated ? auth.getUserId() : null);
    });
  }, [auth]);

  return (
    <div className="container">
      <header>
        <h1>Annex</h1>
        <h2>Append Only Micro Blogs</h2>
      </header>
      {(!auth || loading) && <div>Loading...</div>}
      {auth && !loading && (
        <>
          {!userId && <Anonymous />}
          {!!userId && (
            <Authenticated userId={userId} onSignOut={auth.signOut} />
          )}
        </>
      )}
    </div>
  );
};
