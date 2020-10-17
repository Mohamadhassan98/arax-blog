type Nullable<T> = T | null;
type Maybe<T> = T | undefined;
type Primitives = "string" | "number" | "boolean";
type NullablePrimitives = "string?" | "number?" | "boolean?";
type MaybePrimitives = "?string" | "?number" | "?boolean";
type MaybeNullablePrimitives = "?string?" | "?number?" | "?boolean?";
type PrimitiveTypes<T extends Primitives> = T extends "string" ? string : T extends "number" ? number : boolean;
type NullableTypes<T extends NullablePrimitives> = T extends "string?"
  ? Nullable<string>
  : T extends "number?"
  ? Nullable<number>
  : Nullable<boolean>;
type MaybeTypes<T extends MaybePrimitives> = T extends "?string"
  ? Maybe<string>
  : T extends "?number"
  ? Maybe<number>
  : Maybe<boolean>;
type MaybeNullableTypes<T extends MaybeNullablePrimitives> = T extends "?string?"
  ? Maybe<Nullable<string>>
  : T extends "?number?"
  ? Maybe<Nullable<number>>
  : Maybe<Nullable<boolean>>;
export type SchemaType = Primitives | NullablePrimitives | MaybePrimitives | MaybeNullablePrimitives;
type SchemaModel = Record<string, SchemaType>;
type SchemaInferType<T extends SchemaType> = T extends Primitives
  ? PrimitiveTypes<T>
  : T extends NullablePrimitives
  ? NullableTypes<T>
  : T extends MaybePrimitives
  ? MaybeTypes<T>
  : T extends MaybeNullablePrimitives
  ? MaybeNullableTypes<T>
  : never;


const commentType = MakeConst({
  title: "string",
  id: "number",
  approved: "boolean",
  parent: "boolean?",
});

export function MakeConst<T extends SchemaModel>(type: T) {
  return {...type} as const;
}

type commentType = {[k in keyof typeof commentType]: SchemaInferType<typeof commentType[k]>};
const aComment: commentType = {
  title: "ali",
  id: 12,
  approved: false,
  parent: null,
};


// type Nullable<T> = T | null;
// type Maybe<T> = T | undefined;
// type Primitives = "string" | "number" | "boolean";
// type NullablePrimitives = "string?" | "number?" | "boolean?";
// type MaybePrimitives = "?string" | "?number" | "?boolean";
// type MaybeNullablePrimitives = "?string?" | "?number?" | "?boolean?";
// type PrimitiveTypes<T extends Primitives> = T extends "string" ? string : T extends "number" ? number : boolean;
// type NullableTypes<T extends NullablePrimitives> = T extends "string?"
//   ? Nullable<string>
//   : T extends "number?"
//   ? Nullable<number>
//   : Nullable<boolean>;
// type MaybeTypes<T extends MaybePrimitives> = T extends "?string"
//   ? Maybe<string>
//   : T extends "?number"
//   ? Maybe<number>
//   : Maybe<boolean>;
// type MaybeNullableTypes<T extends MaybeNullablePrimitives> = T extends "?string?"
//   ? Maybe<Nullable<string>>
//   : T extends "?number?"
//   ? Maybe<Nullable<number>>
//   : Maybe<Nullable<boolean>>;
// type SchemaType = Primitives | NullablePrimitives | MaybePrimitives | MaybeNullablePrimitives;
// type SchemaModel = {[k: string]: SchemaType};
// type SchemaInferType<T extends SchemaType> = T extends Primitives
//   ? PrimitiveTypes<T>
//   : T extends NullablePrimitives
//   ? NullableTypes<T>
//   : T extends MaybePrimitives
//   ? MaybeTypes<T>
//   : T extends MaybeNullablePrimitives
//   ? MaybeNullableTypes<T>
//   : never;
// type SchemaResultType<T extends SchemaModel> = {[k in keyof T]: SchemaInferType<T[k]>};
// function Inferable<T extends SchemaModel>(model: T) {
//   return {} as SchemaResultType<T>;
// }
// const comment = Inferable({
//   title: "string",
//   id: "number",
//   approved: "boolean",
//   parent: "boolean?",
// });
// console.log(comment.id /* Voila! Types are correctly inferred! */);