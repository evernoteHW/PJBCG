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
  Geolocation,
} from 'react-native';

import VideoViewCell from '../Cells/VideoViewCell'
import VideoModel from '../Models/VideoModel'

const videoJson = require('../../../../resource/json/video.json');

export default class VideoNewsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData:   [],
      refreshing: false,
    };
  }
  componentDidMount() {
    // this.loadLocalData()
    this.loadNetWorkData()
    // Geolocation.getCurrentPosition(ev =>{
    //       // alert(ev.coords);//坐标（成功）
    //   }).then(error =>{
  
    //   });
  }
  loadLocalData(){
    var localData = []
    for (var i = 0; i <= videoJson.newslist.length - 1; i++) {
      let item = videoJson.newslist[i]
      localData.push(new VideoModel(item))
    }
    this.setState({listData: localData})
  }

  loadNetWorkData(){

    let url = 'http://r.cnews.qq.com/getVideoCatInfo'
    fetch(url,{
      method: 'POST',
      body: `kankaninfo={"num":10,"tag":{"id":"${this.props.id}","videonum":0,"name":"${this.props.tabLabel}"}}&page=0`
    })
      .then((response) => response.json())
      .then((responseJson) => {
          var localData = []
          for (var i = 0; i <= responseJson.newslist.length - 1; i++) {
            let item = responseJson.newslist[i]
            localData.push(new VideoModel(item))
          }
          this.setState({listData: localData,refreshing: false})

      })
      .catch((error) => {
        console.error(error);
    });
    
  }
  _renderItem = ({item, index})=>{
      return <VideoViewCell key={index} item={item}/>
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
            renderItem             = {this._renderItem}
            ItemSeparatorComponent = {this._itemSeparatorComponent}
            removeClippedSubviews  = {false}
            refreshing             = {this.state.refreshing}
            onRefresh              = {this._onRefresh}
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
    backgroundColor: 'white',
  },
  seperator: {
    height: 10,
    backgroundColor: 'rgb(240,240,240)',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

