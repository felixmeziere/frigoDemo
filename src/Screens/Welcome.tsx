import { Input, Page } from 'components';
import { Component, default as React } from 'react';
/**
 *
 * @format
 */
import { Button, StyleSheet, Text, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { connect } from 'react-redux';
import {
  getFormattedSpreadsheetData,
  getFormFieldValues,
  setFormFieldValue,
} from 'redux/app';
import { FormFieldValues } from 'redux/app/reducer';
import { ReduxState } from 'redux/types';
import { FormattedSpreadsheetData } from 'services/formatSpreadsheetData';

interface IProps {
  formattedSpreadsheetData: FormattedSpreadsheetData | null;
  formFieldValues: FormFieldValues;
  setFormFieldValue: typeof setFormFieldValue;
}

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    borderRadius: 8,
    borderWidth: 0.5,
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    // borderColor: 'eggplant',
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputIOS: {
    // borderColor: 'gray',
    borderRadius: 4,
    borderWidth: 1,
    color: 'black',
    fontSize: 16,
    paddingHorizontal: 10,
    paddingRight: 30, // to ensure the text is never behind the icon
    paddingVertical: 'sds',
  },
});

class Welcome extends Component<IProps> {
  public render() {
    return (
      <Page style={{}}>
        {this.props.formattedSpreadsheetData &&
          this.props.formattedSpreadsheetData.fields.map(field => {
            switch (field.type) {
              case 'interval':
                return (
                  <View style={{ flex: 1 }} key={field.name}>
                    <Text>{field.name}</Text>
                    <Input
                      onChangeText={(text: string) =>
                        this.props.setFormFieldValue({
                          field: field.name,
                          value: text,
                        })
                      }
                      value={
                        this.props.formFieldValues[field.name]
                          ? this.props.formFieldValues[field.name].toString()
                          : ''
                      }
                    />
                  </View>
                );
              case 'choix':
                return (
                  <View style={{ flex: 1 }} key={field.name}>
                    <Text style={{}}>{field.name}</Text>
                    <RNPickerSelect
                      placeholder={{
                        color: 'red',
                        label: `Choisissez votre ${field.name}`,
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
                      placeholderTextColor="purple"
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
      </Page>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  formattedSpreadsheetData: getFormattedSpreadsheetData(state),
  formFieldValues: getFormFieldValues(state),
});

const mapDispatchToProps = {
  setFormFieldValue,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Welcome);
