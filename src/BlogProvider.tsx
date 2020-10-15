import React from "react";
import {ReactQueryCacheProvider} from "react-query";
import {DehydratedState, Hydrate} from "react-query/hydration";
import {createBlogCache} from "./CreateBlogQuery";

interface IBlogProvider {
  cache: ReturnType<typeof createBlogCache>;
}

interface IBlogProviderWithDehydrateState {
  cache: ReturnType<typeof createBlogCache>;
  dehydrateState: DehydratedState;
}
const BlogProvider = <T extends true | false | undefined = false>({
  ssr = false,
  cache,
  children,
  ...props
}: {ssr?: T} & (T extends false | undefined ? IBlogProvider : IBlogProviderWithDehydrateState) & {
    children?: React.ReactNode;
  }) => {
  return (
    <ReactQueryCacheProvider queryCache={cache}>
      {ssr ? (
        <Hydrate state={((props as any) as IBlogProviderWithDehydrateState).dehydrateState}>{children}</Hydrate>
      ) : (
        children
      )}
    </ReactQueryCacheProvider>
  );
};

export default BlogProvider;
