import React from "react";
import ReactDOM from "react-dom";
import {ReactQueryDevtools} from "react-query-devtools";
import App from "./App";
import BlogProvider from "./BlogProvider";
import {createBlogCache} from "./CreateBlogQuery";

const blogCache = createBlogCache({
  ssr : true
});
function Index() {
  return (
    <BlogProvider cache={blogCache} >
      <React.StrictMode>
        <ReactQueryDevtools />
        <App />
      </React.StrictMode>
    </BlogProvider>
  );
}

ReactDOM.render(<Index />, document.getElementById("root"));
