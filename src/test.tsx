import React from "react";
import {QueryConfig, QueryKey, useQuery} from "react-query";
interface IPost {
  title: string;
}

enum EBlogTypes {
  GET_BLOGS,
  GET_CATEGORIES,
}
type TGetBlogs = {
  type: EBlogTypes.GET_BLOGS;
  variable?: {blogId: number};
  params?: {search?: string; orderBy?: "DES" | "ASC"};
};
type TGetCategories = {
  type: EBlogTypes.GET_CATEGORIES;
  variable?: {categoryId: number};
  params?: {search?: string; orderBy?: "DES" | "ASC"};
};
type TBlogActions = TGetBlogs | TGetCategories;

const urlChooser = (props: TBlogActions) => {
  switch (props.type) {
    case EBlogTypes.GET_BLOGS:
      /*we can make url with params */
      return props.variable?.blogId ? `/blog/${props.variable?.blogId} ` : "/blog";
    case EBlogTypes.GET_CATEGORIES:
      return props.variable?.categoryId ? `/categories/${props.variable?.categoryId} ` : "/categories";
    default:
      return "";
  }
};

/* getBlog Function that returns a BlogAction */
const getBlogs = (variables?: TGetBlogs["variable"], params?: TGetBlogs["params"]) => {
  return {
    type: EBlogTypes.GET_BLOGS,
    variables,
    params,
  };
};
/*useBlog hook */
const useBlog = <T extends TBlogActions>(
  props: T,
  key?: QueryKey,
  queryConfig?: QueryConfig<T["variable"] extends {} ? IPost : IPost[], unknown>
) => {
  const url = urlChooser(props);
  const rq = useQuery<T["variable"] extends {} ? IPost : IPost[]>(key ? key : url, queryConfig);
  return rq;
};

/**
 * usage
 */
const fetcher = async (url: string) => await fetch(url);
const FF: React.FC = () => {
  const {data} = useBlog(getBlogs({blogId: 1}, {search: "title"}), fetcher);
  return <div></div>;
};
