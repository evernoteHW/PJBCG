// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
} from 'react-native';

var SQUARE_DIMENSIONS = 100;
import PanGestureView from '../modules/news/RootViewPage/Pages/PanGestureView'

export default class TTKBNews extends Component {

 
  render() {

    return (
       <View style={styles.container}>
        <PanGestureView style = {styles.square}  />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  square: {
    width: SQUARE_DIMENSIONS,
    height: SQUARE_DIMENSIONS,
    backgroundColor: 'blue'
  },
});

AppRegistry.registerComponent('TTKBNews', () => TTKBNews);
