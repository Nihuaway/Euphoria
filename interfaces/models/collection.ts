export interface ICollection {
  _id: string;
  user: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISave{
  _id: string;
  shot: string;
  coll: string;
}
