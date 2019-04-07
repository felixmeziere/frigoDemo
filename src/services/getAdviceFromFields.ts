import { FormFieldValues } from 'redux/app/reducer';
import { FormattedSpreadsheetData } from './formatSpreadsheetData';

export default (
  formattedSpreadsheetData: FormattedSpreadsheetData | null,
  formFieldValues: FormFieldValues,
) => {
  try {
    if (formattedSpreadsheetData) {
      let advice = null;
      for (
        let rowIndex = 0;
        rowIndex < formattedSpreadsheetData.rows.length;
        rowIndex += 1
      ) {
        const row = formattedSpreadsheetData.rows[rowIndex];
        let isMatchingRow = false;
        for (
          let columnIndex = 0;
          columnIndex < formattedSpreadsheetData.fields.length;
          columnIndex += 1
        ) {
          const field = formattedSpreadsheetData.fields[columnIndex];
          const fieldValue = formFieldValues[field.name];
          if (fieldValue) {
            const cellValue = row.parameters[columnIndex];
            if (field.type === 'interval') {
              const [min, max] = cellValue.split('-').map(str => Number(str));
              if (min > fieldValue || max < fieldValue) break;
            } else if (field.type === 'choix') {
              if (cellValue !== fieldValue) break;
            }
            if (columnIndex === formattedSpreadsheetData.fields.length - 1) {
              isMatchingRow = true;
            }
          } else break;
        }
        if (isMatchingRow) {
          advice = row.advice;
          break;
        }
      }

      return advice;
    }
  } catch (error) {}

  return null;
};
