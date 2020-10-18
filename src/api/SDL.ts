type Primitives = "string" | "number" | "boolean";

type ArrayItemType = {
  type: Primitives;
  nullable?: true;
};

type ArrayType = [ArrayItemType];

export type DefType = {
  type: Primitives | ArrayType | SchemaModel;
  nullable?: true;
  maybe?: true;
};

type PrimitiveInferType<T extends Primitives> = T extends "string" ? string : T extends "number" ? number : boolean;

type Nullable<T> = T | null;

type Maybe<T> = T | undefined;

type InferPrimitiveOrArray<T extends DefType> = T["type"] extends Primitives
  ? PrimitiveInferType<T["type"]>
  : T["type"] extends ArrayType
  ? Array<InferNullable<T["type"][0]>>
  : T["type"] extends SchemaModel
  ? SchemaResultType<T["type"]>
  : never;

type InferNullable<T extends DefType | ArrayItemType> = T["nullable"] extends true
  ? Nullable<InferPrimitiveOrArray<T>>
  : InferPrimitiveOrArray<T>;

type InferMaybeNullable<T extends DefType> = T["maybe"] extends true
  ? T["nullable"] extends true
    ? Nullable<Maybe<InferPrimitiveOrArray<T>>>
    : Maybe<InferPrimitiveOrArray<T>>
  : InferNullable<T>;

type SchemaModel = {[k: string]: DefType};

type SchemaInferType<T extends DefType> = InferMaybeNullable<T>;

type SchemaResultType<T extends SchemaModel> = {[k in keyof T]: SchemaInferType<T[k]>};

function Inferable<T extends SchemaModel>(model: T) {
  return {} as SchemaResultType<T>;
}

function makeConstObject<T extends SchemaModel>(obj: T) {
  return {...obj} as const;
}

const CommentType = makeConstObject({
  title: {type: "string", maybe: true, nullable: true},
  id: {type: "number"},
  approved: {type: "boolean", maybe: true},
  parent: {type: "boolean", nullable: true, maybe: true},
  children: {type: [{type: "string", nullable: true}], maybe: true},
});

const replyComment = Inferable({
  user: {type: "string"},
  comment: {type: CommentType},
});

const newComment = Inferable({
  title: {type: "string", maybe: true, nullable: true},
  id: {type: "number"},
  approved: {type: "boolean", maybe: true},
  parent: {type: "boolean", nullable: true, maybe: true},
  children: {type: [{type: "string", nullable: true}], maybe: true},
});

const titolo = newComment.children;
