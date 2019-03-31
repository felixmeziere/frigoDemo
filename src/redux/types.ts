import { AppAction } from './app/actions';
import { AppState } from './app/reducer';

export type Action = AppAction;
export interface ReduxState {
  app: AppState;
}
