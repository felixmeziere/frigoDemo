import { Input, Page } from 'components';
import { Component, default as React } from 'react';
/**
 *
 * @format
 */
import { StyleSheet, View, Text } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {
  NavigationProp,
  NavigationState,
  NavigationActions,
} from 'react-navigation';
import { connect } from 'react-redux';
import {
  getFormattedSpreadsheetData,
  getFormFieldValues,
  setFormFieldValue,
  updateAdvice,
} from 'redux/app';
import { FormFieldValues } from 'redux/app/reducer';
import { ReduxState } from 'redux/types';
import { DARK_GREY, WHITE } from 'services';
import { FormattedSpreadsheetData } from 'services/formatSpreadsheetData';
import styled from 'styled-components/native';

interface IProps {
  formattedSpreadsheetFields: FormattedSpreadsheetData | null;
  formFieldValues: FormFieldValues;
  setFormFieldValue: typeof setFormFieldValue;
  navigation: NavigationProp<NavigationState>;
}
interface IState {
  submitButtonMessage: null | string;
}

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    // borderRadius: 8,
    borderWidth: 0.5,
    color: WHITE,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
    paddingVertical: 8,
  },
  inputIOS: {
    // borderRadius: 4,
    borderWidth: 1,
    color: WHITE,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
    paddingVertical: 5,
  },
});

const Title = styled.Text`
  font-size: 24;
  color: ${WHITE};
`;
const TitleContainer = styled.View`
  align-items: center;
  justify-content: center;
  height: 80;
  margin-bottom: 24;
`;
const FieldLabel = styled.Text`
  margin-bottom: 4;
  color: ${WHITE};
  flex: 0.2;
`;
const NumberInput = styled(Input)`
  color: ${WHITE};
  padding-horizontal: 10;
  width: 80;
`;
const ButtonContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
  padding-bottom: 32;
  align-items: center;
`;
const SubmitButton = styled.TouchableHighlight`
  width: 100%;
  background-color: ${DARK_GREY};
  height: 40;
  align-items: center;
  justify-content: center;
`;
const ButtonText = styled.Text`
  color: ${WHITE};
  font-size: 24;
`;
const SubmitButtonMessage = styled.Text`
  color: red;
  font-size: 20;
  margin-bottom: 8;
`;
const FieldUnit = styled.Text`
  color: ${WHITE};
  margin-left: 12;
`;

class Welcome extends Component<IProps, IState> {
  public state: IState = {
    submitButtonMessage: null,
  };

  public render() {
    return (
      <Page>
        <TitleContainer>
          <Title>Magic Frigo</Title>
        </TitleContainer>

        {this.props.formattedSpreadsheetFields &&
          this.props.formattedSpreadsheetFields.fields.map(field => {
            switch (field.type) {
              case 'interval':
                return (
                  <View
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginBottom: 20,
                    }}
                    key={field.name}
                  >
                    <FieldLabel>{`${field.name}`}</FieldLabel>
                    <NumberInput
                      onChangeText={(text: string) => {
                        if (!Number.isNaN(Number(text)) && text.length <= 3) {
                          this.props.setFormFieldValue({
                            field: field.name,
                            value: Number(text),
                          });
                        }
                      }}
                      value={
                        this.props.formFieldValues[field.name]
                          ? this.props.formFieldValues[field.name].toString()
                          : ''
                      }
                    />
                    <FieldUnit>{field.unit ? `${field.unit}` : ''}</FieldUnit>
                  </View>
                );
              case 'choix':
                return (
                  <View style={{ marginBottom: 8 }} key={field.name}>
                    <FieldLabel style={{}}>{field.name}</FieldLabel>
                    <RNPickerSelect
                      placeholder={{
                        color: 'red',
                        label: `${field.name}`,
                        value: null,
                      }}
                      items={field.values.map(value => ({
                        color: 'orange',
                        label: value,
                        value,
                      }))}
                      onValueChange={value => {
                        this.props.setFormFieldValue({
                          field: field.name,
                          value,
                        });
                      }}
                      style={{
                        ...pickerSelectStyles,
                        iconContainer: {
                          right: 10,
                          top: 20,
                        },
                      }}
                      value={this.props.formFieldValues[field.name]}
                      placeholderTextColor={WHITE}
                      Icon={() => {
                        return (
                          <View
                            style={{
                              backgroundColor: 'transparent',
                              borderLeftColor: 'transparent',
                              borderLeftWidth: 10,
                              borderRightColor: 'transparent',
                              borderRightWidth: 10,
                              borderTopColor: 'gray',
                              borderTopWidth: 10,
                              height: 0,
                              width: 0,
                            }}
                          />
                        );
                      }}
                    />
                  </View>
                );
              default:
                return null;
            }
          })}
        <ButtonContainer>
          <SubmitButtonMessage>
            {this.state.submitButtonMessage && this.state.submitButtonMessage}
          </SubmitButtonMessage>
          <SubmitButton onPress={this.onPressSubmit}>
            <ButtonText>Voir les conseils</ButtonText>
          </SubmitButton>
        </ButtonContainer>
      </Page>
    );
  }

  private onPressSubmit = () => {
    let areAllFieldsCompleted =
      this.props.formattedSpreadsheetFields &&
      Object.keys(this.props.formFieldValues).length ===
        this.props.formattedSpreadsheetFields.fields.length;
    Object.values(this.props.formFieldValues).forEach(fieldLabel => {
      if (!this.props.formFieldValues) areAllFieldsCompleted = false;
    });
    if (areAllFieldsCompleted) {
      this.setState({ submitButtonMessage: null });
      this.props.updateAdvice();
      // @ts-ignore
      this.props.navigation.navigate('Results');
    } else
      this.setState({ submitButtonMessage: 'Remplis tous les champs svp' });
  };
}

const mapStateToProps = (state: ReduxState) => ({
  formFieldValues: getFormFieldValues(state),
  formattedSpreadsheetFields: getFormattedSpreadsheetData(state),
});

const mapDispatchToProps = {
  setFormFieldValue,
  updateAdvice,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Welcome);
