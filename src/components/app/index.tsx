import React, { useEffect, useState } from "react";
import { useAuth } from "../auth";
import "./app.css";

export const App = () => {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth) {
      return;
    }

    return auth.onAuthStateChanged(() => {
      setLoading(false);
    });
  }, [auth]);

  return (
    <div className="container">
      <header>
        <h1>Annex</h1>
        <h2>Append Only Micro Blogs</h2>
      </header>
      <main>{loading ? "loading" : "loaded"}</main>
    </div>
  );
};
