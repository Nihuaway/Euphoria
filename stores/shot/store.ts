import { IShot } from 'interfaces/models/shot';
import { IUser } from 'interfaces/models/user';

export enum IQuickShotActions {
  SET = "SET_QUICK_SHOT"
}

export interface IQuickShot {
  shot: IShot, author: IUser
}

export interface IAction {
  type: string;
  payload: IQuickShot | null;
}

export const shotReducer = (state = null, action: IAction): IQuickShot | null => {
  switch (action.type) {
    case IQuickShotActions.SET:
      return action.payload;
    default:
      return state;
  }
}