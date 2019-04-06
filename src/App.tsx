/**
 *
 * @format
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { Welcome } from './Screens';

interface Props {}

export const store = configureStore();

export default class App extends Component<Props> {
  public render() {
    return (
      <Provider store={store}>
        <Welcome />
      </Provider>
    );
  }
}
