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
  FlatList,
  TouchableOpacity,
} from 'react-native';

import VideoRootViewPage from './VideoRootViewPage'


export default class Finance extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
    };
  }
  static navigationOptions = ({navigation}) => {
      return {
          headerTitle: '理财',
          headerVisible: true,
          headerRight: (
              <TouchableOpacity 
                    style={{justifyContent:'center', alignItems: 'center',marginRight: 7, height:30 ,width: 58}} 
                     onPress={() => navigation.state.params.onSettingButtonPress()}
                     >
                    <Text style={{fontSize:16, color:"rgb(253,169,70)"}}>登录</Text>
              </TouchableOpacity>
          ),
          headerTintColor : '#333333',//文字颜色
          headerStyle: {backgroundColor: 'white'}
      }
  }

  render() {
    const { navigation } = this.props;
    return (
      <VideoRootViewPage style={styles.container} navigation={navigation}/>
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
});

