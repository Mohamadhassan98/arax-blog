import React from "react";
import {ReactQueryCacheProvider} from "react-query";
import {DehydratedState, Hydrate} from "react-query/hydration";
import {createBlogCache} from "./CreateBlogQuery";

interface IBlogProvider {
  cache: ReturnType<typeof createBlogCache>;
  ssr?: false;
}
interface IBlogProviderWithDehyrateState {
  cache: ReturnType<typeof createBlogCache>;
  ssr?: true;
  dehydrateState: DehydratedState;
}
const BlogProvider: React.FC<IBlogProvider> = ({cache, children, dehydrateState, ssr}) => {
  return (
    <ReactQueryCacheProvider queryCache={cache.queryCache}>
      {ssr ? <Hydrate state={dehydrateState}>{children}</Hydrate> : {children}}
    </ReactQueryCacheProvider>
  );
};

export default BlogProvider;
