import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import { userReducer } from './user/store';
import { shotsReducer } from './shots/store';
import { windowReducer } from './window/store';
import { IQuickShot, shotReducer } from './shot/store';
import { titleReducer } from './title/store';
import { suggestReducer } from 'stores/suggest/store';

import { IUser } from 'interfaces/models/user';
import { IWindow } from 'interfaces/window';
import { IShot } from 'interfaces/models/shot';
import { ReactElement } from 'react';

export interface IRootReducer {
  shots: IShot[];
  user: IUser;
  window: IWindow;
  suggest: ReactElement;
  shot: IQuickShot | null;
  title: string;
}

const rootReducer = combineReducers({
  shots: shotsReducer,
  user: userReducer,
  window: windowReducer,
  suggest: suggestReducer,
  shot: shotReducer,
  title: titleReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware())
);
