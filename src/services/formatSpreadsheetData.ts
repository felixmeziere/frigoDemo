import { GoogleApiResponse } from 'src/redux/sagas/appSagas';

export interface Field {
  name: string;
  type: 'interval' | 'choix';
  unit: string;
  values: string[];
}

export interface Row {
  parameters: string[];
  advice: string[];
}

export interface FormattedSpreadsheetData {
  fields: Field[];
  rows: Row[];
}

export default (
  spreadSheetData: GoogleApiResponse['values'],
): FormattedSpreadsheetData | null => {
  try {
    const separatorIndex = spreadSheetData[0].findIndex(
      value => value === 'SEPARATEUR',
    );
    const parameterNames = spreadSheetData[0].slice(1, separatorIndex);
    const parameterTypes = spreadSheetData[1].slice(1, separatorIndex);
    const parameterUnits = spreadSheetData[2].slice(1, separatorIndex);

    const fields = parameterNames.map((parameterName, index) => ({
      name: parameterName,
      type: parameterTypes[index],
      unit: parameterUnits[index],
      values: [],
    })) as Field[];

    const rows: Row[] = [];
    spreadSheetData.slice(3).forEach(row => {
      row.slice(1, separatorIndex).forEach((cell, index) => {
        if (!fields[index].values.includes(cell)) {
          fields[index].values.push(cell);
        }
      });
      rows.push({
        advice: row.slice(separatorIndex + 1),
        parameters: row.slice(1, separatorIndex),
      });
    });
    return { fields, rows };
  } catch (error) {
    return null;
  }
};
