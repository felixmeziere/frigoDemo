/**
 *
 * @format
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './redux/configureStore';
import { Welcome } from './screens';

interface IProps {}

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
