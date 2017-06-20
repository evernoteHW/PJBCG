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
  TextInput,
} from 'react-native';


var ScrollableTabView = require('react-native-scrollable-tab-view');


export default class MoreChannelCityPage extends Component {
    
    constructor(props) {
      super(props);
      
      this.state = { listData:[],subListData:[] ,totalData: [], cureentIndex: 0};
    }
    static navigationOptions = ({navigation}) => {
      return {
        header: (
          <View style = {styles.navigateBar}>
            <View style = {styles.titleView}>
              <Image 
                source = {require('../../../../images/attention/attention_tag_search.png')}
                style  = {styles.search_left_icon}
              />
              <TextInput 
                style       = { styles.search } 
                placeholder = {'搜索想添加的'}
              />
            </View>
            <TouchableOpacity
              style = {styles.navigateBar_left}
              onPress = {() => navigation.goBack()}
            >
              <Image 
                source = {require('../../../../images/attention/attention_back_image.png')}
                style  = {styles.navigateBar_right_image}
              />
            </TouchableOpacity>
          </View>
        ),
    }
  }
  componentDidMount(){
    this.loadNetWorkData()
  }
  loadNetWorkData(){
  
    fetch('http://r.cnews.qq.com/getMySubNewsRecomm')
      .then((response) => response.json())
      .then((responseJson) => {
          
          let totalData = responseJson.recomm;
           this.setState(Object.assign({},
            {totalData}), () => {
            this.changeDataSource(0)
          });

      })
      .catch((error) => {
        console.error(error);
    });
  }
  changeDataSource(index){
      var listData = []
      var subListData = []
      for (var i = 0; i < this.state.totalData.length; i++) {
        let item = this.state.totalData[i]
        if(i==index){
          
          for (var j = 0; j < item.list.length; j++) {
            let subItem = item.list[j]
            subListData.push({key: j, tagname: subItem.tagname, subCount: subItem.subCount})
          }
          
        }
        listData.push({key: i, name: item.name})
      }
      this.setState({listData: listData,subListData: subListData,cureentIndex: index})
  }
  
  _renderItemLeft = ({item,index}) =>{

    return(
         <TouchableOpacity 
            key = {index} 
            style = {[styles.flatList_item,{backgroundColor:this.state.cureentIndex == index ? 'white':'rgb(244,245,247)'}]}
            onPress = {() => this.changeDataSource(index)}
          >
            <Text 
              style = {
                        [
                          styles.item_left_text,
                          {
                              color:    this.state.cureentIndex == index ? '#e0620d':'#2c2c2c',
                              fontSize: this.state.cureentIndex == index ? 16:14,
                          }
                        ]
                      }>
                        {item.name}
            </Text> 
        </TouchableOpacity>
    )
  }
   _renderItemRight = ({item,index}) =>{
    return(
         <TouchableOpacity key = {index} style = {styles.flatList_item}>
            <View>
              <Text style = {styles.item_left_text}>#{item.tagname}#</Text>
              <Text style = {styles.item_right_text}>{item.subCount}人关注</Text> 
            </View>
            <TouchableOpacity
             style = {styles.attentionBtn}
            >
              <Text style = {styles.attentionBtn_text}>+关注</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.flatList_left}>
             <FlatList
              data                           = {this.state.listData}
              renderItem                     = {this._renderItemLeft}
              removeClippedSubviews          = {false}
              showsHorizontalScrollIndicator = {false}
              showsVerticalScrollIndicator   = {false}
            />
        </View>
         <View style = {styles.flatList_right}>
             <FlatList
              data                           = {this.state.subListData}
              renderItem                     = {this._renderItemRight}
              removeClippedSubviews          = {false}
              showsHorizontalScrollIndicator = {false}
              showsVerticalScrollIndicator   = {false}
              // keyExtractor = {({item,index}) => "index"+index+item}
              ItemSeparatorComponent         = {() => 
                <View style = {styles.separator}></View>
              }
            />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    flexDirection:   'row',
    // justifyContent:  'center',
    // alignItems: 'center',
    backgroundColor: 'white',
  },
  container_top:{
    marginLeft:     20,
    marginRight:    20,
    marginBottom:   20,
    flexDirection:  'row',
    justifyContent: 'space-between'
  },
  navigateBar_left:{
    justifyContent: 'center',
    // alignItems:     'center',
    position:       'absolute',
    top:            27,
    left:           7,
    width:          60,
    height:         30,
  },
  navigateBar_right_image:{
    width:  20,
    height: 20,
  },
  header_right:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_right_image:{
    width : 15,
    height: 15,
  },
  selectedImage:{
    width:  21,
    height: 21
  },
  flatList_left:{
    width : 60,
    backgroundColor: 'rgb(245,245,247)',
  },
  flatList_right:{
    flex : 1,
    backgroundColor: 'white',
  },
  flatList_item:{
    flexDirection:  'row',
    justifyContent: 'center',
    alignItems:     'center',
    height:         50,
    justifyContent: 'space-between'
  },
  item_left:{
    flexDirection: 'row',
  },
  item_left_text:{
    marginLeft: 10,
    color:      '#2c2c2c',
    fontSize:   14,
  },
  search:{
    flex:       1,
    marginLeft: 5,
    color:      '#333333',
    fontSize:   14,
  },
  search_left_icon:{
    marginLeft: 5,
    width:  15,
    height: 15
  },
  item_right_text:{
    marginTop:  5,
    marginLeft: 10,
    color:      '#8a8a8a',
    fontSize:   12,
  },
  separator:{
    marginLeft:      10,
    marginRight:     10,
    height:          0.5,
    backgroundColor: 'rgb(244,245,247)',
  },
  navigateBar:{
    height:          64, 
    backgroundColor: 'white'
  },
  headerText:{
    fontSize: 16,
    color:    '#333333',
  },
  top_right_text:{
    marginLeft: 2,
    fontSize: 12,
    color:    '#f07507',
  },
  titleView:{
    flexDirection:   'row',
    alignItems:      'center',
    // justifyContent:  'center',
    position:        'absolute',
    borderRadius:    3,
    left:            40,
    right:           10,
    top:             30,
    height:          25,
    backgroundColor: 'rgb(244,245,247)'
  },
  title: {
    fontSize: 14,
    color:    '#333333',
  },
  attentionBtn:{
    marginRight:     10,
    justifyContent:  'center',
    alignItems:      'center',
    borderRadius:    3,
    borderWidth:     0.5,
    borderColor:     '#e0620d',
  },
  attentionBtn_text:{
    marginLeft:      15,
    marginRight:     15,
    marginBottom:    2.5,
    marginTop:    2.5,
    color:    '#e0620d',
    fontSize: 13,
  },
  bottom:{
    textAlign: 'center',
    marginLeft:      20,
    marginRight:     20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom_left_text: {
    fontSize: 12,
    color: '#2c2c2c',
  },
  bottom_right_text: {
    fontSize:   12,
    color:      '#1296db',
  },
});

