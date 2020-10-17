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

const apis: Readonly<IQuery[]> = [
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
  } as const,
];
const felan = apis[0];

export function MakeConst<T extends Readonly<IQuery[]>>(type: T) {
  const newType = type.map((t) => ({...t} as const));
  return newType;
}
// const createApi = (apiArr: IQuery[]) => {
const constApi = MakeConst(apis);
// };
