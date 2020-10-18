// import {SchemaType} from "./types";
//
// type TVariableType = {[k in keyof typeof commentType]: SchemaInferType<typeof commentType[k]>};
// interface IQuery {
//   /**
//    * params going to be like {
//    *  search : string,
//    *  orderBy : ['DES' , 'ASC']
//    * }
//    *
//    */
//   params?: Record<string, SchemaType | Readonly<Array<string /*| SchemaType*/>>>;
//   /**
//    *  {
//    *      blogId : 'number'
//    *  }
//    */
//   variables?: Record<string, SchemaType>;
//   //url type must be change to /string type
//   url: string;
// }
//
// const apis = {
//   getAll: {
//     url: "/posts",
//     params: {
//       search: "string?",
//       orderBy: ["DES", "ASC"],
//     },
//     variables: {
//       blogId: "number",
//     },
//   } as const,
// } as const;
//
// function withMyQuery(queryKey: keyof typeof apis) {
//   const query = apis[queryKey];
//   return query.variables;
// }
//
// const a = withMyQuery("getAll");
//
// export function MakeConst<T extends Readonly<IQuery[]>>(type: T) {
//   const newType = type.map((t) => ({...t} as const));
//   return newType;
// }
// // const createApi = (apiArr: IQuery[]) => {
// // const constApi = MakeConst(apis);
// // };
// interface NonType {
//   name: string;
// }
//
// function makeConstAgain<T extends ReadonlyArray<NonType>>(obj: T) {
//   return obj;
// }

import {SchemaType} from "./types";

interface IQuery {
  readonly type: string;
  /**
   * params going to be like {
   *  search : string,
   *  orderBy : [‘DES’ , ‘ASC’]
   * }
   *
   */
  readonly params?: Record<string, SchemaType | Readonly<Array<string /*| SchemaType*/>>>;
  /**
   *  {
   *      blogId : ‘number’
   *  }
   */
  readonly variables?: Record<string, SchemaType>;
  //url type must be change to /string type
  readonly url: string;
}

// type QueryType = {
//   [k: string]: IQuery;
// };
// const felan =
export function makeApiSchema<T extends Readonly<IQuery[]>>(type: T) {
  return type;
}

function makeConstArray<T extends ReadonlyArray<IQuery>>(t: T) {
  const constantObjs = t.map((value) => ({...value} as const));
  return [...constantObjs] as const;
}

const a = makeConstArray([
  {
    type: "GET_ALL",
    url: "/posts",
    params: {
      search: "string?",
      orderBy: ["DES", "ASC"],
    },
    variables: {
      blogId: "number",
    },
  },
  {
    type: "GET_SOME",
    url: "/post",
    params: {
      filter: "string?",
    },
    variables: {
      postId: "number",
    },
  },
]);

const myApis = makeApiSchema([
  {
    type: "GET_ALL",
    url: "/posts",
    params: {
      search: "string?",
      orderBy: ["DES", "ASC"],
    },
    variables: {
      blogId: "number",
    },
  },
  {
    type: "GET_SOME",
    url: "/post",
    params: {
      filter: "string?",
    },
    variables: {
      postId: "number",
    },
  },
] as const);
const [, {type: fofo}] = myApis;

const myApis2 = makeApiSchema(a);

const inf = myApis2[0].type;

console.log(fofo);
/**my Apis has currect type */
