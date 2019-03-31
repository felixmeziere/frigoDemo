import { delay, takeEvery } from 'redux-saga/effects';
import { init } from '../app/actions';
import { getType } from 'typesafe-actions';

function* initSaga() {
  yield delay(2000);
}

export default function*() {
  yield takeEvery(getType(init), initSaga);
}
