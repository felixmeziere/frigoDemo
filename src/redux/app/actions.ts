import { ActionType, createStandardAction } from 'typesafe-actions';
import { AppState } from './reducer';
import { FormattedSpreadsheetData } from 'services/formatSpreadsheetData';

export const init = createStandardAction('APP/INIT')<{}>();
export const setAppField = createStandardAction('APP/SOME_ACTION')<{
  field: keyof AppState;
  value: string | number | boolean;
}>();
export const getSpreadsheetDataRequest = createStandardAction(
  'APP/GET_SPREADSHEET_DATA.REQUEST',
)<{}>();
export const getSpreadsheetDataSuccess = createStandardAction(
  'APP/GET_SPREADSHEET_DATA.SUCCESS',
)<FormattedSpreadsheetData>();
export const getSpreadsheetDataFailure = createStandardAction(
  'APP/GET_SPREADSHEET_DATA.FAILURE',
)<{}>();
export const setFormFieldValue = createStandardAction(
  'APP/SET_FORM_FIELD_VALUE',
)<{ field: string; value: string | number }>();

export type AppAction = ActionType<
  | typeof setAppField
  | typeof init
  | typeof getSpreadsheetDataRequest
  | typeof getSpreadsheetDataSuccess
  | typeof getSpreadsheetDataFailure
  | typeof setFormFieldValue
>;
