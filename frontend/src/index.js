if (process.env.NODE_ENV !== "development") {
  // redirect to https
  if (location.protocol === "http:") {
    location.href = "https://qasong.com" + location.pathname;
  }
}

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from "regenerator-runtime";

ReactDOM.render(<App />, document.getElementById("app"));
