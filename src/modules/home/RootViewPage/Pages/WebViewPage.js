/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  WebView,
  Dimensions,
} from 'react-native';
const screenWidth = Dimensions.get('window').width

export default class WebViewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData:   [],
      refreshing: false,
    };
  } 
  render() {
    const {navigate, state} = this.props.navigation
    const { params } = state
    return (
      <View style={styles.container}>
        <WebView 
          source = {{ url:params.surl }}
          style  = { styles.webView }
        />
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
  webView: {
    width: screenWidth,
  },
});

