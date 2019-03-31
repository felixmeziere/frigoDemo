import { all } from 'redux-saga/effects';
import { default as watchApp } from './appSagas';

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([watchApp()]);
}
