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
  Image,
  DeviceEventEmitter,
} from 'react-native';

import { StackNavigator , TabNavigator} from 'react-navigation';

import Attention   from '../modules/attention'
import Finance       from '../modules/finance'
import Home        from '../modules/home'
import Mine        from '../modules/mine'
import WebViewPage from '../modules/home/RootViewPage/Pages/WebViewPage'
import ChannelManagePage from '../modules/home/RootViewPage/Pages/ChannelManagePage'
import MoreChannelCityPage from '../modules/home/RootViewPage/Pages/MoreChannelCityPage'
import AttentionTagPage from '../modules/attention/AttentionTagPage'
import Guide from '../modules/guide'

const RouteConfigs = 
{
    Home: {
      screen:        Home    
      ,
      navigationOptions: {
        tabBarLabel: '首页',
        tabBarIcon: ({focused,tintColor}) => (
          <Image 
            source = {focused ? require('../images/tab/scr_root_home_selected.png'): require('../images/tab/scr_root_home_normal.png')}
            style  = {{height:21 ,width: 21}}
          />
        )
      },
    },
    Finance: {
      screen:            Finance,
      navigationOptions: {
        tabBarLabel: '理财',
        tabBarIcon: ({focused,tintColor}) => (
          <Image 
            source = {focused ? require('../images/tab/scr_root_finance_selected.png'): require('../images/tab/scr_root_finance_normal.png')}
            style  = {{height:21 ,width: 21}}
          />
        )
      }
    },
    Mine: {
      screen:            Mine,
      navigationOptions: {
        tabBarLabel: '我的',
        tabBarIcon: ({focused,tintColor}) => (
          <Image 
            source = {focused ? require('../images/tab/scr_root_mine_selected.png'): require('../images/tab/scr_root_mine_normal.png')}
            style  = {{height:21 ,width: 21}}
          />
        )
      }
    },
}

const TabNavigatorConfig = {
    animationEnabled: false, // 切换页面时是否有动画效果
    tabBarPosition:   'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled:     false, // 是否可以左右滑动切换tab
    tabBarOptions:    {
      activeTintColor:   '#d81e06',// 文字和图片选中颜色
      inactiveTintColor: '#2c2c2c', // 文字和图片未选中颜色
      showIcon:          true, // android 默认不显示 icon, 需要设置为 true 才会显示
      showLabel:         true,
      // lazy:              true,
      swipeEnabled:      true,
      indicatorStyle:    {
        height: 0  // 如TabBar下面显示有一条线，可以设高度为0后隐藏
      }, 
      tabStyle:{
        backgroundColor: 'orange'
      },
      style: {
         backgroundColor: '#FFFFFF', // TabBar 背景色
      },
      tabStyle:{
        tintColor: 'red'
      },
      labelStyle: {
         // fontSize: 15, // 文字大小
      },
      // pressOpacity: 1,
    },
  
};

const TabBars = TabNavigator(RouteConfigs,TabNavigatorConfig)

const App = StackNavigator({
    TabBars:             { screen: TabBars },
    WebViewPage:         { screen: WebViewPage },
    AttentionTagPage:    { screen: AttentionTagPage },
    ChannelManagePage:   { screen: ChannelManagePage},
    MoreChannelCityPage: { screen: MoreChannelCityPage},
},{
    headerMode:           'screen' ,
    mode:                 'card',

});

export default class PJBCG extends Component {
  constructor(props) {
    super(props);
    this.state = { installed:    false}
  }
  //启动页面。。。。
  componentDidMount(){
    
  }
  componentWillUnmount(){
    this.notification.remove();
  }

  render() {
    if (this.state.installed) {
      return (
        <App screenProps={{ta:''}}/>
      );
   }else{
    return (
        <Guide register={()=> this.setState({installed: true})} goLook={()=> this.setState({installed: true})}/>
      );
   }
  }
}