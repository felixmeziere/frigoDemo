import { Page } from 'components';
import { Component, default as React } from 'react';
import { Text } from 'react-native';
/**
 *
 * @format
 */
import { connect } from 'react-redux';
import { getAdvice, setFormFieldValue } from 'redux/app';
import { FormFieldValues } from 'redux/app/reducer';
import { ReduxState } from 'redux/types';
import { WHITE } from 'services';
import { FormattedSpreadsheetData } from 'services/formatSpreadsheetData';
import styled from 'styled-components/native';

interface IProps {
  formattedSpreadsheetFields: FormattedSpreadsheetData | null;
  formFieldValues: FormFieldValues;
  setFormFieldValue: typeof setFormFieldValue;
  advice: null | string[];
}

const PieceOfAdvice = styled.Text`
  color: ${WHITE};
  font-size: 16;
  margin-bottom: 16;
`;

class Welcome extends Component<IProps> {
  public render() {
    return (
      <Page>
        {this.props.advice ? (
          this.props.advice.map(advice => (
            <PieceOfAdvice key={advice}>{advice}</PieceOfAdvice>
          ))
        ) : (
          <Text style={{ fontSize: 20, color: 'red' }}>
            Les parametres ne correspondent a aucun conseil
          </Text>
        )}
      </Page>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  advice: getAdvice(state),
});

export default connect(mapStateToProps)(Welcome);
