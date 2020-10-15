import {QueryCache, ReactQueryConfig} from "react-query";

export const createBlogCache = ({
  ...configObject
}: {
  frozen?: boolean;
  defaultConfig?: ReactQueryConfig;
}) => {
    const blogCache = new QueryCache(configObject)
  return {queryCache: blogCache};
};
