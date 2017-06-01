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
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import NewsModel from '../Models/NewsModel'
// import Video from 'react-native-video'

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export default class VideoViewCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPlaying: false,
    };
  }
  componentDidMount(){
    // this.player.seek(0)
  }
  loadStart(e){
    console.log('视频开始加载');
  }
  setDuration(e){
    console.log('视频加载完成，即将播放');
  }
  setTime(e){
    console.log('setTime');
  }
  onEnd(e){
    console.log('视频播放完成');
  }
  videoError(e){
    console.log('视频播放出错');
  }
  _playVideo(item){
    //播放视频
    this.setState({isPlaying: true})
  }
  test(){
    return <Text>123213123</Text>
  }
  render() {
    const { item } = this.props
    let isPlaying = this.state.isPlaying
    return (
      <View style = {styles.container}>
          <Image
            source = {{url:item.thumbnails[0]}}
            style  = {styles.image}
          >
            <Text style={styles.title}>{item.title}</Text>
            <TouchableOpacity 
              style   = {styles.playImage_bg}
              onPress = {this._playVideo(item)}
            >
                <Image 
                  source = {require('../../../../images/video/scr_video_play.png')}
                  style  = {styles.playImage}
                />
            </TouchableOpacity>
          </Image>
          <View style = {styles.bottom}>
              <Image
                source = {{url:item.chlsicon}}
                style  = {styles.headerIcon} 
              />
              <Text style = {styles.bottom_text}>{item.source}</Text>
          </View>
          {
            this.test()
            // isPlaying ? null : null
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  content:{
    // marginLeft: 10, 
    // marginRight: 10,
    // marginTop: 10,
    // marginBottom: 5,
    // backgroundColor: 'yellow',
  },
  content_0:{
    flexDirection: 'row'
  },
  title:{
    fontWeight:       'bold',
    lineHeight:       20,
    textShadowColor:  'gray',
    textShadowOffset: {width:0.5,height: 0.5},
    marginTop:        10,
    marginLeft:       10, 
    marginRight:      10,
    color:            'white',
    fontSize:         18,
    backgroundColor:  'transparent',
  },
  image: {
     width:           '100%', 
     height:          (312.0/660.0) * screenWidth ,
     backgroundColor: 'gray',
     marginBottom:    5,
  },
  playImage_bg:{
    position:  'absolute',
    alignSelf: 'center',
    top:       ((312.0/660.0) * screenWidth - 42)/2.0,
  },
  playImage:{
    width:     42,
    height:    42,
  },
  headerIcon:{
    marginLeft:   15,
    marginRight:  5,
    width:        25,
    height:       25,
    borderRadius: 12.5,
  },
  image_content:{
    flexDirection: 'row'
  },
  samllerImage:{
     width:        (screenWidth - 20)/3.0, 
     height:       (130/196.0) * (screenWidth - 20)/3.0 ,
     marginBottom: 5,
     marginRight:  2,
  },
  bottom: {
   flexDirection: 'row',
   alignItems:    'center',
   marginBottom:  10,
  },
  bottom_text:{
    fontSize: 12,
    color:    '#2c2c2c',
  },
  backgroundVideo:{
    position:'absolute',
    top:0,
    left:0,
    height:100,
    right:0,
    backgroundColor: 'orange',
  },
});

