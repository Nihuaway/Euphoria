export interface IShot {
  _id: string;
  title: string;
  content: string;
  user: string;
  category: string;
  tags: string[];
  images: string[];
  createdAt: string;
  editedAt?: string;
  popularity: number;
  isDraft: boolean;
  inProcess?: boolean;
}

export interface ILike{
  _id: string;
  user: string;
  shot: string;
}

export interface IView{
  _id: string;
  user: string;
  shot: string;
}