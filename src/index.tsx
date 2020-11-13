import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import app from "firebase/app";
import { App } from "./components/app";
import { AuthContext } from "./components/auth";
import { config } from "./services/firebase-config";
import { FirebaseAuth } from "./services/FirebaseAuth";
import "./index.css";
import { reportWebVitals } from "./reportWebVitals";
import "./reset.css";

app.initializeApp(config);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthContext.Provider value={new FirebaseAuth()}>
        <App />
      </AuthContext.Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
