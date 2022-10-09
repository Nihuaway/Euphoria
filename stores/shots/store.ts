import { IShot } from 'interfaces/models/shot';

export enum ShotsActions {
  SET = 'SET_SHOTS',
  EDIT = 'EDIT_SHOTS',
  REMOVE = 'REMOVE_SHOTS',
}

interface TRemove {
  type: ShotsActions.REMOVE;
  payload: string;
}

interface TEdit {
  type: ShotsActions.EDIT;
  payload: IShot;
}

interface TSet {
  type: ShotsActions.SET;
  payload: IShot[] | null
}

type Actions = TSet | TEdit | TRemove;

export const shotsReducer = (
  state: IShot[] | null = null,
  action: Actions
): IShot[] | null => {
  switch (action.type) {
    case ShotsActions.SET:
      return action.payload;
    case ShotsActions.EDIT:
      if (!state) return state;
      return state.map((shot) => {
        if (shot._id === action.payload._id) return action.payload;
        return shot;
      });
    case ShotsActions.REMOVE:
      if (!state) return state;
      return state.filter((shot) => shot._id !== action.payload);
    default:
      return state;
  }
};
