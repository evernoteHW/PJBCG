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

import PasswordGesture from 'react-native-gesture-password'
export const screenWidth = Dimensions.get('window').width

export default class MessageCenter extends Component {
  constructor(props) {
    super(props);
    this.state = {
        message: 'Please input your password.',
        status: 'normal',
    };
  }
  static navigationOptions = ({navigation}) => {
      return {
        header: null
      }
  }
  onEnd(password) {
        if (password == '123') {
            this.setState({
                status: 'right',
                message: 'Password is right, success.'
            });

            // your codes to close this view
        } else {
            this.setState({
                status: 'wrong',
                message: 'Password is wrong, try again.'
            });
        }
    }
    onStart() {
        this.setState({
            status: 'normal',
            message: 'Please input your password.'
        });
    }
    onReset() {
        this.setState({
            status: 'normal',
            message: 'Please input your password (again).'
        });
    }
    componentDidMount(){
        //注册通知
       
    }
   
    render() {
      return (
        <View style = {styles.container}>
            <PasswordGesture
              ref     = 'pg'
              status  = {this.state.status}
              message = {this.state.message}
              onStart = {() => this.onStart()}
              onEnd   = {(password) => this.onEnd(password)}
            />
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

