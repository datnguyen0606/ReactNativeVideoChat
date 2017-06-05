/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import App from './src/index';
import { AppRegistry } from 'react-native';

export default class ReactNativeVideoChat extends Component {
  render() {
    return (
      <App />
    );
  }
}

AppRegistry.registerComponent('ReactNativeVideoChat', () => ReactNativeVideoChat);
