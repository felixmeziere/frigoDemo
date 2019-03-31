import { ReduxState } from 'redux/types';

export const getFormattedSpreadsheetData = (state: ReduxState) =>
  state.app.formattedSpreadsheetData;
export const getFormFieldValues = (state: ReduxState) =>
  state.app.formFieldValues;
