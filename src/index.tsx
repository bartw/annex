import React from "react";
import ReactDOM from "react-dom";
import "./reset.css";
import "./index.css";
import { App } from "./App";
import { reportWebVitals } from "./reportWebVitals";
import { AuthContext } from "./components/auth";
import { FirebaseAuth } from "./services/FirebaseAuth";

ReactDOM.render(
  <React.StrictMode>
    <AuthContext.Provider value={new FirebaseAuth()}>
      <App />
    </AuthContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
