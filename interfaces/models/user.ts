export interface IUser {
  id: string;
  name: string;
  email: string;
  shots: Array<string>;
  collections: Array<string>;
  avatar?: string;
  skills: string[];
  biography: string;
  isDelete: boolean;
  deleteAt?: Date;
}

export interface IFollowing{
  _id: string;
  user: string;
  subscriber: string;
}