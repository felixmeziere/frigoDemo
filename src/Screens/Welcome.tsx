/**
 *
 * @format
 */

import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import {
  getFormattedSpreadsheetData,
  setFormFieldValue,
  getFormFieldValues,
} from 'redux/app';
import { ReduxState } from 'redux/types';
import { connect } from 'react-redux';
import { FormattedSpreadsheetData } from 'services/formatSpreadsheetData';
import { Page, Input } from 'components';
import { FormFieldValues } from 'redux/app/reducer';
import RNPickerSelect from 'react-native-picker-select';

interface Props {
  formattedSpreadsheetData: FormattedSpreadsheetData | null;
  formFieldValues: FormFieldValues;
  setFormFieldValue: typeof setFormFieldValue;
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    // borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    // borderColor: 'eggplant',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

class Welcome extends Component<Props> {
  render() {
    return (
      <Page style={{ justifyContent: 'center', alignItems: 'center' }}>
        {this.props.formattedSpreadsheetData &&
          this.props.formattedSpreadsheetData.fields.map(field => {
            switch (field.type) {
              case 'interval':
                return (
                  <View style={{ flex: 1 }} key={field.name}>
                    <Text>{field.name}</Text>
                    <Input
                      onChangeText={text =>
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
                    <Text style={{ marginBottom: 60 }}>{field.name}</Text>
                    <RNPickerSelect
                      placeholder={{
                        label: `Choisissez votre ${field.name}`,
                        value: null,
                        color: 'red',
                      }}
                      items={field.values.map(value => ({
                        label: value,
                        value: value,
                        color: 'orange',
                      }))}
                      onValueChange={value => {
                        this.props.setFormFieldValue({
                          field: field.name,
                          value: value,
                        });
                      }}
                      style={{
                        ...pickerSelectStyles,
                        iconContainer: {
                          top: 20,
                          right: 10,
                        },
                      }}
                      value={this.props.formFieldValues[field.name]}
                      placeholderTextColor="purple"
                      Icon={() => {
                        return (
                          <View
                            style={{
                              backgroundColor: 'transparent',
                              borderTopWidth: 10,
                              borderTopColor: 'gray',
                              borderRightWidth: 10,
                              borderRightColor: 'transparent',
                              borderLeftWidth: 10,
                              borderLeftColor: 'transparent',
                              width: 0,
                              height: 0,
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
