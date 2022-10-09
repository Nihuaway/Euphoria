import {IUser} from "interfaces/models/user";

export enum UserActions {
  SET_USER = 'SET_USER',
  UPDATE_LIKES = 'UPDATE_USER_LIKES',
  UPDATE_SHOTS = 'UPDATE_USER_SHOTS',
  UPDATE_COLL = 'UPDATE_USER_COLLECTIONS',
}

export interface IAction {
  type: string,
  payload: IUser
}

export const userReducer = (state = null, action: IAction): IUser | null => {
  switch (action.type) {
    case UserActions.SET_USER:
      return action.payload;
    // case UserActions.UPDATE_LIKES:
    //   if(!state) return state
    //   return Object.assign(state, {likes: action.payload.likes})
    case UserActions.UPDATE_SHOTS:
      if(!state) return state
      return Object.assign(state, {shots: action.payload.shots})
    case UserActions.UPDATE_COLL:
      if(!state) return state
      return Object.assign(state, {collections: action.payload.collections})
    default:
      return state;
  }
}


