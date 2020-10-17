export type TComment = {
  id: string;
  user: string;
  text: string;
  createdAt: Date;
};

export type TCategory = {
  id: string;
  children?: TCategory;
  name: string;
  belongsTo: string;
};
