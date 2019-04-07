import { getAdviceFromFields } from 'services';
import { FormattedSpreadsheetData } from 'services/formatSpreadsheetData';
import { getType } from 'typesafe-actions';
import { Action } from '../types';
import {
  getSpreadsheetDataFailure,
  getSpreadsheetDataRequest,
  getSpreadsheetDataSuccess,
  setFormFieldValue,
  updateAdvice,
} from './actions';

export interface FormFieldValues {
  [key: string]: string | number;
}

export interface AppState {
  formattedSpreadsheetFields: FormattedSpreadsheetData | null;
  formFieldValues: FormFieldValues;
  advice: null | string[];
}

const initialState = {
  advice: null,
  formFieldValues: {},
  formattedSpreadsheetFields: null,
};

export default (state: AppState = initialState, action: Action): AppState => {
  switch (action.type) {
    case getType(getSpreadsheetDataRequest):
      return state;
    case getType(getSpreadsheetDataSuccess):
      return { ...state, formattedSpreadsheetFields: action.payload };
    case getType(getSpreadsheetDataFailure):
      return state;
    case getType(updateAdvice):
      return {
        ...state,
        advice: getAdviceFromFields(
          state.formattedSpreadsheetFields,
          state.formFieldValues,
        ),
      };
    case getType(setFormFieldValue):
      const newFormFieldValues = {
        ...state.formFieldValues,
        [action.payload.field]: action.payload.value,
      };
      return {
        ...state,
        formFieldValues: newFormFieldValues,
      };
    default:
      return state;
  }
};
