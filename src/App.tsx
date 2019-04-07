import { RootNavigator } from 'navigation';
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import configureStore from './redux/configureStore';

interface IProps {}

export const store = configureStore();

export default class App extends Component<IProps> {
  public render() {
    return (
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    );
  }
}
