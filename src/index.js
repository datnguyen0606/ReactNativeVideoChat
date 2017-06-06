import React, {Component} from 'react';
import App from "./components/App";
import { Provider } from 'react-redux';
import configureStore from './configureStore';

const store = configureStore();

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}