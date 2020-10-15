import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {ReactQueryDevtools} from "react-query-devtools";

function Index() {
  return (
    <React.StrictMode>
      <ReactQueryDevtools />
      <App />
    </React.StrictMode>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));
