/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers, Reducer } from 'redux';

import { reducer as appReducer } from './app';
import { ReduxState, Action } from './types';

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default combineReducers<ReduxState, Action>({
  app: appReducer,
});
