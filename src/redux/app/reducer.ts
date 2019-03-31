import { Action } from '../types';

export interface AppState {
  something: string;
}

const initialState = {
  something: 'toto',
};

export default (state: AppState = initialState, action: Action): AppState => {
  switch (action.type) {
    default:
      return state;
  }
};
