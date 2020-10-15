import React from "react";
import ReactDOM from "react-dom";
import {ReactQueryDevtools} from "react-query-devtools";
import App from "./App";
import BlogProvider from "./BlogProvider";

function Index() {
  return (
    <BlogProvider cache={{} as any} ssr dehydrateState={{} as any}>
      <App />
    </BlogProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <ReactQueryDevtools />
    <Index />
  </React.StrictMode>,
  document.getElementById("root")
);
