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
} from 'react-native';

import PageViewCell from '../Cells/PageViewCell'
import NewsModel from '../Models/NewsModel'
import WebViewPage from './WebViewPage'

const newsJson = require('../../../../resource/json/news.json');

export default class NormalNewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData:   [],
      refreshing: false,
    };
    // this._onPress.bind(this)
  }
  componentDidMount() {
    this.loadLocalData()
    // this.loadNetWorkData()
  }
  loadLocalData(){
    var localData = []
    for (var i = 0; i <= newsJson.newslist.length - 1; i++) {
      let item = newsJson.newslist[i]
      localData.push(new NewsModel(item))
    }
    this.setState({listData: localData})
  }
  loadNetWorkData(){
    let url = this.differentURL(this.props.tabLabel)
    console.log(url);
    fetch(url,{
        method: 'POST',
        body: 'cityList=深圳&uid=4A589D05-221D-45FC-AF60-5F2200A010B2&chlid=kb_news_pvp&last_id=&last_time=1495165135&userCity=深圳&adcode=440305&provinceId=19&forward=0&cityId=199&page=0&cachedCount=15',
      })
      .then((response) => response.json())
      .then((responseJson) => {
         //写入数据库
         var localData = []
         for (var i = 0; i <= responseJson.newslist.length - 1; i++) {
            let item = responseJson.newslist[i]
            localData.push(new NewsModel(item))
          }
          this.setState({listData: localData,refreshing: false})
      })
      .catch((error) => {
        console.error(error);
    });
    
  }
  differentURL(title){
    switch(title){
      case '推荐': return 'http://r.cnews.qq.com/getSubNewsInterest';
      case '热点': return 'http://r.cnews.qq.com/getLiveNewsIndexAndItems';
      case '直播': return 'http://r.cnews.qq.com/getSubNewsInterest';
      case '娱乐': return 'http://r.cnews.qq.com/getSubNewsInterest';
      case '关注': return 'http://r.cnews.qq.com/getSubNewsInterest';
      case '社会': return 'http://r.cnews.qq.com/getSubNewsInterest';
      case '汽车': return 'http://r.cnews.qq.com/getSubNewsInterest';
    }
    return ''
  }
  _onPress(item){
     const { navigate } = this.props.navigation;
     navigate('WebViewPage',{surl:item.surl})
  }
  _renderItem = ({item, index})=>{
      const {navigation} = this.props
      // console.log(navigation);
      return <PageViewCell key={index} item={item} onPress={this._onPress.bind(this)}/>
  }
  _itemSeparatorComponent(){
    return <View style={styles.seperator} />
  }
  _onRefresh = ()=>{
    this.setState({refreshing: true})
    this.loadNetWorkData()
  }
  render() {
    return (
      <View style={styles.container}>
          <FlatList
            style                  = {{backgroundColor : 'white', width: '100%'}}
            data                   = {this.state.listData}
            renderItem             = {this._renderItem.bind(this)}
            ItemSeparatorComponent = {this._itemSeparatorComponent}
            refreshing             = {this.state.refreshing}
            onRefresh              = {this._onRefresh}
            removeClippedSubviews  = {false}
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
  seperator: {
    height: 0.5,
    backgroundColor: 'rgb(240,240,240)',
    marginLeft: 10,
    marginRight: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

