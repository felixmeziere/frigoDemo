import { FormattedSpreadsheetData } from 'services/formatSpreadsheetData';
import { getType } from 'typesafe-actions';
import { Action } from '../types';
import {
  getSpreadsheetDataFailure,
  getSpreadsheetDataRequest,
  getSpreadsheetDataSuccess,
  setFormFieldValue,
} from './actions';

export interface FormFieldValues {
  [key: string]: string | number;
}

export interface AppState {
  formattedSpreadsheetData: FormattedSpreadsheetData | null;
  formFieldValues: FormFieldValues;
}

const initialState = {
  formattedSpreadsheetData: null,
  formFieldValues: {},
};

export default (state: AppState = initialState, action: Action): AppState => {
  switch (action.type) {
    case getType(getSpreadsheetDataRequest):
      return state;
    case getType(getSpreadsheetDataSuccess):
      return { ...state, formattedSpreadsheetData: action.payload };
    case getType(getSpreadsheetDataFailure):
      return state;
    case getType(setFormFieldValue):
      return {
        ...state,
        formFieldValues: { ...state.formFieldValues, ...action.payload },
      };
    default:
      return state;
  }
};
