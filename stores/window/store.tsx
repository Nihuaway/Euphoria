import { IWindow } from 'interfaces/window';
import { ReactElement } from 'react';

export enum WindowActions {
  SET = 'SET_WINDOW',
  SET_LOADED = 'SET_WINDOW_LOADED',
  HIDE = 'HIDE_WINDOW',
}

interface IAction {
  type: string;
  payload: ReactElement | null;
}

export const windowReducer = (
  state: IWindow | null = null,
  action: IAction
): IWindow | null => {
  switch (action.type) {
    case WindowActions.SET:
      return { content: action.payload, isLoaded: false };
    case WindowActions.SET_LOADED:
      if(!state) return null;
      return {...state, isLoaded: true};
    case WindowActions.HIDE:
      return null;
    default:
      return state;
  }
};