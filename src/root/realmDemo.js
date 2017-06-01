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
  TouchableOpacity,
  Modal,
  DeviceEventEmitter,
} from 'react-native';

var SQUARE_DIMENSIONS = 100;

import Login from '../modules/login'

export default class TTKBNews extends Component {

  constructor(props) {
    super(props);
  
    this.state = {modalVisible: false,parms: {}};
  }
  _onPress = () =>{
    this.setState({modalVisible :true})
  }
  _cancel = () =>{
    this.setState({modalVisible :false})
  }
  // _login = () =>{
    
  // }
  componentDidMount(){
    this.notification = DeviceEventEmitter.addListener('LoginSuccess', (parms)=>{
      //登陆成功
      console.log(`parms = ${parms.info}`)
      this.setState({modalVisible :false,parms: parms})
    });
  }
  componentWillUnmount(){
    this.notification.remove();
  }
  render() {

    return (
       <View style={styles.container}>
          <Text>{this.state.parms.info}...</Text>
          <TouchableOpacity 
            style   = {styles.square}  
            onPress = {this._onPress}
          />
           <Modal
            animationType  = {'slide'}
            transparent    = {false}
            visible        = {this.state.modalVisible}
            onRequestClose = {() => {alert("Modal has been closed.")}}
          >
            <Login 
              cancel = {this._cancel.bind(this)} 
              // login  = {this._login.bind(this)}
            />
          </Modal>
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
