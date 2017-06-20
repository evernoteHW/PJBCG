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
  Image,
  SectionList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SegmentedControlIOS,
} from 'react-native';

import PageViewCell from '../Cells/PageViewCell'
import NewsModel from '../Models/NewsModel'
import WebViewPage from './WebViewPage'
import PanGestureView from './PanGestureView'
import ItemsLocationChange from './ItemsLocationChange'
import SingleItemsMap from './SingleItemsMap'

const screenWidth = Dimensions.get('window').width;
var itemHeight = (screenWidth - 5*10)/4.0;

export default class ChannelManagePage extends Component {
   static navigationOptions = ({navigation}) => {
      return {
        header: (
          <View style = {styles.navigateBar}>
            <View style = {styles.titleView}>
             <Text style = {styles.headerText}>频道管理</Text>
            </View>
            <TouchableOpacity style = {styles.navigateBar_left} onPress = {() => navigation.goBack()} >
              <Image  
                source = {require('../../../../images/attention/attention_back_image.png')} 
                style  = {styles.navigateBar_right_image} 
              />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.navigateBar_right} onPress = {() => navigation.goBack()} >
              <Image  
                source = {require('../../../../images/attention/attention_tag_search.png')} 
                style  = {[styles.navigateBar_right_image,{}]} />
            </TouchableOpacity>
          </View>
        ),
    }
  }
   constructor(props) {
    super(props);
    this.state = {
      myChannelData:[
                      {key:'推荐'},
                      {key:'王者荣耀'},
                      {key:'视频'},
                      {key:'热点'},
                      {key:'直播'},
                      {key:'深圳'},
                      {key:'娱乐'},
                      {key:'关注'},
                      {key:'社会'},
                      {key:'搞笑'},
                      {key:'汽车'},
                      {key:'美食'},
                      {key:'美女'},
                      {key:'大学生'},
                      {key:'国际'},
                    ],
      hotChannelData:[
                      {key:'NBA'},
                      {key:'体育'},
                      {key:'军事'},
                      {key:'财经'},
                      {key:'科技'},
                      {key:'快手'},
                      {key:'GIF'},
                      {key:'图片'},
                      {key:'情感'},
                      {key:'时尚'},
                      {key:'房产'},
                      {key:'历史'},
                      {key:'萌宠'},
                      {key:'养生'},
                      {key:'星族'},
                      {key:'电影'},
                      {key:'育儿'},
                      {key:'数码控'},
                      {key:'政务'},
                      {key:'男人装'},
                    ],
       cityChannelData: [
                      {key:'北京'},
                      {key:'上海'},
                      {key:'重庆'},
                      {key:'西安'},
                      {key:'广州'},
                      {key:'成都'},
                      {key:'郑州'},
                      {key:'武汉'},
                      {key:'石家庄'},
                      {key:'杭州'},
                      {key:'苏州'},
                      {key:'南京'},
                      {key:'昆明'},
                      {key:'济南'},
                    ],
        selectedTapIndex: 0,                 
        scroll:           true,   
    };

  }
  renderItem = () =>{
    return <Text style = {{backgroundColor: 'orange'}} >12312312</Text>
  }
  render() {
    return (
      <View style={styles.container}>
        <ItemsLocationChange 
          navigation      = {this.props.navigation}
          // itemData     = {this.state.itemData}
          myChannelData   = {this.state.myChannelData}
          renderItem      = {this.renderItem}
          hotChannelData  = {this.state.hotChannelData}
          cityChannelData = {this.state.cityChannelData}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:       'flex-start',
    backgroundColor: 'white',
  },
  navigateBar_left:{
    justifyContent: 'center',
    position:       'absolute',
    top:            27,
    left:           7,
    width:          60,
    height:         30,
  },
  navigateBar_right:{
    justifyContent: 'center',
    alignItems:     'center',
    position:       'absolute',
    top:            20,
    right:           7,
    width:          44,
    height:         40,
  },
  navigateBar:{
    height:          64, 
    backgroundColor: 'white'
  },
  headerText:{
    fontSize: 16,
    color:    '#333333',
  },
  titleView:{
    flexDirection:   'row',
    alignItems:      'center',
    justifyContent:  'center',
    position:        'absolute',
    borderRadius:    3,
    left:            40,
    right:           40,
    top:             30,
    height:          25,
    // backgroundColor: 'rgb(244,245,247)'
  },
  navigateBar_right_image:{
    width:  20,
    height: 20,
  },
});

