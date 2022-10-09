
export enum TitleActions {
  SET = "SET_TITLE"
}

export interface IAction {
  type: string,
  payload: string
}

export const titleReducer = (state =  'Untitled', action: IAction): string => {
  switch (action.type) {
    case TitleActions.SET:
      return action.payload;
    default:
      return state;
  }
}