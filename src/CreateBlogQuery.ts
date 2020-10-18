import {QueryCache} from "react-query";

export const createBlogCache = ({...configObject}: ConstructorParameters<typeof QueryCache>[0]) => {
  const blogCache = new QueryCache(configObject);
  return blogCache;
};
