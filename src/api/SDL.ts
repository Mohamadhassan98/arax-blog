type Primitives = "string" | "number" | "boolean";

type SchemaType = Primitives | ArrayType | SchemaModel | "this";

type ArrayItemType = {
  type: SchemaType;
  nullable?: boolean;
  // isNullable: ArrayItemType;
};

type ArrayType = [ArrayItemType];

type DefType = {
  readonly type: SchemaType;
  nullable?: boolean;
  optional?: boolean;
  // isOptional: DefType;
  // isNullable: DefType;
};

export enum PrimitiveTypes {
  String = "string",
  Number = "number",
  Boolean = "boolean",
}

export function Primitive(type: PrimitiveTypes): DefType {
  return {
    type,
    optional: false,
    nullable: false,
    // get isOptional() {
    //   this.optional = true;
    //   return this;
    // },
    // get isNullable() {
    //   this.nullable = true;
    //   return this;
    // },
  } as const;
}

export function typeOf(type: SchemaModel, nullable?: boolean, optional?: boolean) {
  return {type, nullable, optional} as const;
}

export function arrayOf(type: ArrayItemType, nullable?: boolean, optional?: boolean) {
  return {type: [type], nullable, optional} as const;
}

export function This(nullable?: boolean, optional?: boolean) {
  return {type: "this", nullable, optional} as const;
}

type PrimitiveInferType<T extends Primitives> = T extends "string" ? string : T extends "number" ? number : boolean;

type Nullable<T> = T | null;

type Optional<T> = T | undefined;

type InferType<T extends DefType | ArrayItemType> = T["type"] extends Primitives /* T extended DefType only */
  ? PrimitiveInferType<T["type"]>
  : T["type"] extends ArrayType
  ? Array<InferNullable<T["type"][0]>>
  : T["type"] extends SchemaModel
  ? SchemaResultType<T["type"]>
  : never;

type InferNullable<T extends DefType | ArrayItemType> = T["nullable"] extends true
  ? Nullable<InferType<T>>
  : InferType<T>;

type InferOptionalNullable<T extends DefType> = T["optional"] extends true
  ? T["nullable"] extends true
    ? Nullable<Optional<InferType<T>>>
    : Optional<InferType<T>>
  : InferNullable<T>;

type SchemaModel = {[k: string]: DefType};

type SchemaInferType<T extends DefType> = InferOptionalNullable<T>;

type SchemaResultType<T extends SchemaModel> = {
  [k in keyof T]: T[k]["type"] extends "this" ? SchemaResultType<T> : SchemaInferType<T[k]>;
};

function Inferable<T extends SchemaModel>(model: T) {
  return {} as SchemaResultType<T>;
}

export function createModel<T extends SchemaModel>(obj: T) {
  return {...obj} as const;
}
