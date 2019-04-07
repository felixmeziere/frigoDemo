import { put, takeEvery } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';
import { getSpreadsheetDataSuccess, init } from 'redux/app';
import { formatSpreadsheetData } from 'services';
import { getType } from 'typesafe-actions';
import { getWholeSheet1 } from './helpers';

export interface GoogleApiResponse {
  majorDimension: string;
  range: string;
  values: string[][];
}

function* initSaga() {
  try {
    const response: GoogleApiResponse = yield call(getWholeSheet1);
    const formattedSpreadhseetData = yield call(
      formatSpreadsheetData,
      response.values,
    );
    yield put(getSpreadsheetDataSuccess(formattedSpreadhseetData));
  } catch (error) {
    console.warn(error.response.data);
  }
}

export default function*() {
  yield takeEvery(getType(init), initSaga);
}
