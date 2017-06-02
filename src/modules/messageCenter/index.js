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
  TouchableOpacity,
  TextInput,
  DeviceEventEmitter,
  Alert,
  ScrollView,
  Image,
} from 'react-native';

export const screenWidth = Dimensions.get('window').width

export default class MessageCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData:   [],
      refreshing: false,
      userName:   '',
      pwd:        '',
    };
  }
   static navigationOptions = ({navigation}) => {
      return {
        headerTitle: '消息中心'
      }
  }
  componentDidMount(){
      //注册通知
     
  }
 
  render() {
    return (
      <View style = {styles.container}>
      </View>
    );
  }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    // alignItems: 'center',
  },
});

