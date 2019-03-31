import axios from 'axios';
import { call } from 'redux-saga/effects';
import { SPREADSHEET_ID, SPREADSHEETS_API_KEY } from 'environment';

const GOOGLE_SHEETS_BASE_URL = 'https://sheets.googleapis.com/v4/spreadsheets';

function* callGoogleSheetsAPI(postSpreadsheetString: string) {
  const url = `${GOOGLE_SHEETS_BASE_URL}/${SPREADSHEET_ID}${postSpreadsheetString}?key=${SPREADSHEETS_API_KEY}`;
  return yield call(axios.get, url);
}

export function* getWholeSheet1() {
  const response = yield call(callGoogleSheetsAPI, '/values/A1:Z200');
  return response.data;
}
