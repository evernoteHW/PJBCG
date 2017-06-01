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
  AsyncStorage,
} from 'react-native';

import VideoNewsPage from '../../home/RootViewPage/Pages/VideoNewsPage'

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import DefaultTabBar from '../../home/RootViewPage/Pages/DefaultTabBar'


export default class VideoRootViewPage extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      videoItemData: [
                      {key: 10001,title: '搞笑'},
                      {key: 10011,title: '音悦'},
                      {key: 10005,title: '奇趣'},
                      {key: 10006,title: '影视'},
                      {key: 10009,title: '相声小品'},
                      {key: 10007,title: '科技感'},
                      {key: 10012,title: '游戏'},
                      {key: 10004,title: '生活味'},
                      {key: 10013,title: '时尚'},
                      {key: 10002,title: '生活味'},
                      {key: 10008,title: '动漫'},
                      {key: 10010,title: '创意'},
                     ]
    };
  }
  componentDidMount(){
  }
  render() {
    var backgroundColor = 'white'
    //更换主题
    //Async
    //  AsyncStorage.getItem('ThemeTopic').then((value) =>{
    //   if (value === '88888') {
    //     backgroundColor = 'red'
    //     console.log(`red......`)
    //   }else{
    //     backgroundColor = 'orange'
    //     console.log(`orange......`)
    //   }
    // })
    //sync
    try{
      let backgroundColor = AsyncStorage.getItem('ThemeTopic')
      // console.log(`颜色......${backgroundColor}`)
    }catch(error){

    }
    // console.log(`index/..........`)
    const { navigation } = this.props;
    return (
      <View style={[styles.container,{backgroundColor: backgroundColor}]}>
      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
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

