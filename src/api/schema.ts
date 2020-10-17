interface APIRoute {
  readonly href: string;

  as(...variables: string[]): string;

  as(args: RouteArgument): string;
}

type RouteArgument = {
  variables?: string[];
  params: {[key: string]: string};
};

export class NextRouteImpl implements APIRoute {
  href: string;
  private readonly regex = /\[.*?]/;

  constructor(href: string) {
    this.href = href;
  }

  as(args: RouteArgument): string;

  as(...variables: string[]): string;

  as(...param: any[]) {
    if (typeof param[0] === "object") {
      return this.asArgument(param[0]);
    } else {
      return this.asVariables(...param);
    }
  }

  private asVariables(...variables: string[]) {
    let result = this.href;
    for (const variable of variables) {
      result = result.replace(this.regex, variable);
    }
    return result;
  }

  private asArgument({params, variables}: RouteArgument) {
    let result = this.asVariables(...(variables || []));
    if (Object.keys(params).length === 0) {
      return result;
    }
    result = `${result}?`;
    for (const key in params) {
      result = `${result}${key}=${params[key]}&`;
    }
    return result.substring(0, result.length - 1);
  }
}

type THttpMethod = "Get" | "Post" | "Put" | "Patch" | "Delete";

type TSchemaQuery = {
  /**
   * `Get` by default
   */
  method?: THttpMethod;
  /**
   * A string with format `comments/[comment-id]`.
   * This will be used for key in the query cache and will be appended to base path to send fetch requests.
   */
  api: string;
  /**
   * Variables used in api. All the variables in form [variable-name] should be present in `variables` and any
   * additional query parameter should be present in `params`.
   */
  variables?: RouteArgument;
  body?: any /*i.e. unknown by the time*/;
};

/**
 * Same as query for now...
 */
type TSchemaMutation = {
  /**
   * `Get` by default
   */
  method?: THttpMethod;
  /**
   * Variables used in api. All the variables in form [variable-name] should be present in `variables` and any
   * additional query parameter should be present in `params`.
   */
  variables?: RouteArgument;
  /**
   * A string with format `comments/[comment-id]`.
   * This will be used for key in the query cache and will be appended to base path to send fetch requests.
   */
  api: string;
  body?: any /*i.e. unknown by the time*/;
};

type Schema = {
  Query: {[k: string]: TSchemaQuery};
  Mutation: {[k: string]: TSchemaMutation};
};

export type TSchema = {};

// const mySchema: Schema = {
//   Query: {
//     comments: {
//       api: "comments",
//     },
//   },
// };
