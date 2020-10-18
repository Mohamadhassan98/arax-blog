import {SchemaType} from "./types";

// type TVariableType = {[k in keyof typeof commentType]: SchemaInferType<typeof commentType[k]>};
interface IQuery {
  type: string;

  /**
   * params going to be like {
   *  search : string,
   *  orderBy : ['DES' , 'ASC']
   * }
   *
   */
  params?: Record<string, SchemaType | Readonly<Array<string /*| SchemaType*/>>>;
  /**
   *  {
   *      blogId : 'number'
   *  }
   */
  variables?: Record<string, SchemaType>;
  //url type must be change to /string type
  url: string;
}
// type QueryType = {
//   [k: string]: IQuery;
// };


// const felan =

export function makeApiSchema<T extends Readonly<IQuery[]>>(type: T) {
  return type;
}

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
] as const);
/**my Apis has currect type */


const apis /*:QueryType*/ = {
    GET_ALL: {
      url: "/posts",
      params: {
        search: "string?",
        orderBy: ["DES", "ASC"],
      },
      variables: {
        blogId: "number",
      },
    },
  } as const;
  
// const createApi = (apiArr: IQuery[]) => {
// const constApi = MakeConst(apis);
// };

interface tt {
  name: string;
}
function forTsOnly<T extends Readonly<tt[]>>(x: T) {
  return x;
}
const newYY = forTsOnly([{name: "ali"}, {name: "mohammad"}, {name: "feal"}] as const);

const w = newYY[0].name;

const y = [
  {
    name: "ali",
  },
  {
    name: "mohammad",
  },
] as const;
const newY = forTsOnly(({} as const) as Readonly<tt[]>);

// const w: (keyof typeof y[0])[0] = y[0];
