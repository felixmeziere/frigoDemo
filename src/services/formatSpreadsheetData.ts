import { GoogleApiResponse } from 'src/redux/sagas/appSagas';

export interface Field {
  name: string;
  type: 'interval' | 'choix';
  unit: string;
  values: string[];
}

export interface FormattedSpreadsheetData {
  fields: Field[];
}

export default (
  spreadSheetValues: GoogleApiResponse['values'],
): FormattedSpreadsheetData => {
  const separatorIndex = spreadSheetValues[0].findIndex(
    value => value === 'SEPARATEUR',
  );
  const adviceNames = spreadSheetValues[0].slice(separatorIndex + 1);
  const parameterNames = spreadSheetValues[0].slice(1, separatorIndex);
  const parameterTypes = spreadSheetValues[1].slice(1, separatorIndex);
  const parameterUnits = spreadSheetValues[2].slice(1, separatorIndex);

  const fields = parameterNames.map((parameterName, index) => ({
    name: parameterName,
    type: parameterTypes[index],
    unit: parameterUnits[index],
    values: [],
  })) as Field[];

  spreadSheetValues.slice(3).forEach(row => {
    row.slice(1, separatorIndex).forEach((cell, index) => {
      const type = fields[index].type;
      if (!fields[index].values.includes(cell)) {
        fields[index].values.push(cell);
      }
    });
  });
  console.log(spreadSheetValues[4]);
  console.log(fields);
  return { fields };
};
