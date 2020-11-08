import React, { useEffect, useState } from "react";
import { useFirebase } from "./components/firebase";
import "./App.css";

const App = () => {
  const firebase = useFirebase();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firebase) {
      return;
    }

    return firebase.onAuthStateChanged(() => {
      setLoading(false);
    });
  }, [firebase]);

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

export default App;
