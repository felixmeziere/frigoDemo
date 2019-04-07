import { ReduxState } from 'redux/types';

export const getFormattedSpreadsheetData = (state: ReduxState) =>
  state.app.formattedSpreadsheetFields;
export const getFormFieldValues = (state: ReduxState) =>
  state.app.formFieldValues;
export const getAdvice = (state: ReduxState) => state.app.advice;
