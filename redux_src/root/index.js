/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux'
import store from '../store'

import ModalAppNavigator  from './modalApp'

export default class PJBCG extends Component {  
  render() {
      return (
        <Provider store={store}>
          <ModalAppNavigator /> 
        </Provider>
      );
  }
}
