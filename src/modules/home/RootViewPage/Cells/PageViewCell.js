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

const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

export default class PageViewCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  _onPress = ()=>{
    if (this.props.onPress) {
      this.props.onPress(this.props.item)
    }
  }
  

  picShowType3(item){
    return <View style={styles.content}>
              <Text style = {styles.title}>{item.title}</Text>
              <Image
                source = {{url:item.thumbnails[0]}}
                style  = {styles.image}
              />
              <View style = {styles.bottom}>
                <Text style = {styles.bottom_text1}>小社会</Text>
                <Text style = {styles.bottom_text2}>80评价</Text>
                <Text style = {styles.bottom_text3}>1小时前</Text>
              </View>
           </View>
  }
  picShowType2(item){
    return <View style={styles.content}>
              <Text style = {styles.title}>{item.title}</Text>
              <View style={styles.image_content}>
                {
                    item.thumbnails_qqnews.map((url,index) => {
                      return  index > 2? null :<Image
                                key    = {index}
                                source = {{url:url}}
                                style  = {styles.samllerImage}
                              />
                    })
                }
              </View>
              <View style = {styles.bottom}>
                <Text style = {styles.bottom_text1}>小社会</Text>
                <Text style = {styles.bottom_text2}>80评价</Text>
                <Text style = {styles.bottom_text3}>1小时前</Text>
              </View>
           </View>
  }
   picShowType0(item){
    return <View style={styles.content}>
              <View style={styles.content_0}>
                <Text style = {styles.title_0}>{item.title}</Text>
                <Image
                  source = {{url:item.thumbnails[0]}}
                  style  = {styles.image_0}
                />
              </View>
              <View style = {styles.bottom}>
                <Text style = {styles.bottom_text1}>小社会</Text>
                <Text style = {styles.bottom_text2}>80评价</Text>
                <Text style = {styles.bottom_text3}>1小时前</Text>
              </View>
           </View>
  }
  render() {
    const { item } = this.props
    return (
      <TouchableOpacity 
        style = {styles.container}
        onPress = {this._onPress}
      >
          {item.picShowType == '3' ? this.picShowType3(item) : null}
          {item.picShowType == '2' ? this.picShowType2(item) : null}
          {item.picShowType == '0' ? this.picShowType0(item) : null}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  content:{
    marginLeft: 10, 
    marginRight: 10,
    marginTop: 10,
    marginBottom: 5,
    // backgroundColor: 'yellow',
  },
  content_0:{
    flexDirection: 'row'
  },
  title:{
    color:        'rgb(30,30,30)',
    lineHeight:   18,
    marginBottom: 5,
  },
  image: {
   width: screenWidth - 20, 
   height: (312.0/660.0) * screenWidth ,
   backgroundColor: 'gray',
   marginBottom: 5,
  },
  image_0:{
    width: 196.0/2.0,
    height: 130.0/2.0,
  },
  title_0:{
      flex: 1,lineHeight: 18,
  },
  image_content:{
    flexDirection: 'row'
  },
  samllerImage:{
   width: (screenWidth - 20)/3.0, 
   height: (130/196.0) * (screenWidth - 20)/3.0 ,
   // backgroundColor: 'red',
   marginBottom: 5,
   marginRight: 2,
  },
  bottom: {
   flexDirection: 'row',
   alignItems: 'flex-start',
   marginBottom: 10,
  },
  bottom_text1:{
    fontSize: 12,
    color: 'gray',
  },
  bottom_text2:{
    marginLeft: 5,
    fontSize: 12,
    color: 'gray',
  },
  bottom_text3:{
    marginLeft: 5,
    fontSize: 12,
    color: 'gray',
  },
});

