import { ReactElement } from 'react';

export enum SuggestActions {
  ADD = 'ADD_SUGGEST',
}

interface IAction{
  type: SuggestActions.ADD;
  payload: ReactElement;
}

export const suggestReducer = (
  state = null,
  action: IAction
): ReactElement | null => {
  switch (action.type) {
    case SuggestActions.ADD:
      return action.payload;
    default:
      return state;
  }
};
