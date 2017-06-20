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
  Image,
} from 'react-native';

import NormalNewsPage from './Pages/NormalNewsPage'
import VideoNewsPage from './Pages/VideoNewsPage'

import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';

import DefaultTabBar from './Pages/DefaultTabBar'


export default class RootViewPage extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
    };
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <ScrollableTabView 
          tabBarInactiveTextColor = '#2c2c2c'
          tabBarActiveTextColor   = '#d81e06'
          tabBarBackgroundColor   = 'white'
          tabBarUnderlineStyle    = {{backgroundColor: 'red',height: 2}}
          ref                     = "scrollableTabView"
          initialPage             = {0}
          tabBarTextStyle         = {{marginTop: 20, fontSize: 15}}
          renderTabBar            = {() => <ScrollableTabBar 
                                              style={{height: 60,borderWidth:0,marginRight: 44}} 
                                            />
                                    }
        >
            <NormalNewsPage  tabLabel = "推荐" navigation={navigation} />
            <VideoNewsPage   id = {10001} tabLabel = "视频" navigation={navigation} />
            <NormalNewsPage  tabLabel = "热点" navigation={navigation} />
            <NormalNewsPage  tabLabel = "直播" navigation={navigation} />
            <NormalNewsPage  tabLabel = "深圳" navigation={navigation} />
            <NormalNewsPage  tabLabel = "娱乐" navigation={navigation} />
            <NormalNewsPage  tabLabel = "关注" navigation={navigation} />
            <NormalNewsPage  tabLabel = "社会" navigation={navigation} />
            <NormalNewsPage  tabLabel = "汽车" navigation={navigation} />


        </ScrollableTabView>
          <TouchableOpacity
            style = {styles.navigateBar_right}
            onPress = {()=> navigation.navigate('ChannelManagePage')}
          >
            <Image 
              source = {require('../../../images/attention/attention_navigationbar_right.png')}
              style  = {styles.navigateBar_right_image}
            />
        </TouchableOpacity>
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
  navigateBar_right:{
    justifyContent:  'center',
    alignItems:      'center',
    position:        'absolute',
    top:             0,
    right:           0,
    width:           44,
    height:          60,
    backgroundColor: 'white',
  },
  navigateBar_right_image:{
    marginTop: 10,
    width:  20,
    height: 20,
  },
});

