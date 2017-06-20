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

import PanGestureView from './PanGestureView'

const screenWidth = Dimensions.get('window').width;
var itemHeight = (screenWidth - 5*10)/4.0;

export default class ItemsLocationChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
        selectedTapIndex: 0,                 
        scroll:           true,   
    };
  }
  onPanResponderRelease = (movePanGesture,index,moveBehindPoint,callback) => {
   
      const  { myChannelData, hotChannelData, cityChannelData } = this.props;

      var replacePanGesture = undefined
      for (var i = 0; i < hotChannelData.length; i++) {
          let pointee = this.refs[`PanGestureView_${i}`]
          if (pointee != movePanGesture) {
            if(this.pointInRect(moveBehindPoint,pointee.state.frame)){
              replacePanGesture = pointee
            }
          }
      }

      if (typeof replacePanGesture != 'undefined') {

        let frame_from = movePanGesture.state.frame
        let frame_to = replacePanGesture.state.frame

        movePanGesture.startMove(frame_from,frame_to,() => {
          this.refs.scrollViewSuper.setNativeProps({ scrollEnabled: true })
        })
        replacePanGesture.startMove(frame_to,frame_from,() => {
          this.refs.scrollViewSuper.setNativeProps({ scrollEnabled: true })
        })
      }else{

        movePanGesture.restart(() => {
          this.refs.scrollViewSuper.setNativeProps({ scrollEnabled: false })
        })
      }
  }
  /**
   * 判断拖动的目标是否在指定区域的范围内 如果在返回真 如果不在返回NO
   * @param  {[type]} point [description]
   * @param  {[type]} frame [description]
   * @return {[type]}       [description]
   */
  pointInRect(point,frame){
    if (point.x >= frame.x && 
        point.x <= frame.x + frame.width &&
        point.y >= frame.y && 
        point.y <= frame.y + frame.height) {
      return true
    }
    return false
  }
  render() {

    const  { myChannelData, hotChannelData, cityChannelData } = this.props;

    const { navigate } = this.props.navigation
    let itemData       = this.state.selectedTapIndex == 0 ? hotChannelData : cityChannelData
    let bottomBtnText  = this.state.selectedTapIndex == 0 ? '更多频道' : '全部城市'
    return (
      <View style={styles.container}>
        <ScrollView  ref = 'scrollViewSuper' style = {styles.scrollView} scrollEnabled = {this.state.scroll}>
          <View 
            ref   = {(component) => this.scrollViewContainer = component}
            style = {styles.contentContainer} >
            <Text style = {styles.myChannelTip}>我的频道(拖动调整顺序)</Text>
            {
              //我自己的频道
              myChannelData.map((item,index) => {
                return <TouchableOpacity 
                         style = {styles.flatList_item}
                         key   = {index}
                        >
                         <Text style = {styles.flatList_item_text}>{item.key}
                          </Text>
                       </TouchableOpacity>
              })
            }
            <Text style = {styles.myChannelTip}>热门频道(点击添加更多)</Text>
            <View style = {styles.segmentedControlIOSBG}>
                <SegmentedControlIOS 
                  style         = {styles.segmentedControlIOS}
                  tintColor     = '#d81e06'
                  selectedIndex = {0}
                  values        = {['频道', '城市']}
                  // onValueChange = {(index) => console.log(`index = ${index}`)}
                  onChange      = {(e)     => this.setState({selectedTapIndex: e.nativeEvent.selectedSegmentIndex})}
                />
            </View>
            <View ref = {(component) => this.downScrollViewContainer = component} style = {styles.downContentContainer}>
            {
              //我自己的频道
              itemData.map((item,index) => {
                return  <PanGestureView
                          index                 = {index}
                          ref                   = {`PanGestureView_${index}`}
                          key                   = {index}
                          onPanResponderGrant   = {() => {
                              this.refs.scrollViewSuper.setNativeProps({
                                scrollEnabled: false  
                              })
                          }}
                          onPanResponderRelease = {this.onPanResponderRelease}
                        >
                            <TouchableOpacity 
                             style = {styles.flatList_item}
                            >
                             <Text 
                              style = {styles.flatList_item_text}>{item.key}
                             </Text>
                            </TouchableOpacity>
                        </PanGestureView>
              })
            }
            </View>
          </View>
          <TouchableOpacity style = {styles.allCity} onPress = {() => navigate('MoreChannelCityPage')}>
            <Text style = {styles.allCity_text}>{bottomBtnText}</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:       'flex-start',
    // justifyContent: 'center',
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
  allCity:{
    marginLeft:      5,
    marginRight:     5,
    marginTop:       15,
    marginBottom:    15,
    height:          40,
    justifyContent:  'center',
    alignItems:      'center',
    backgroundColor: 'rgb(244,245,247)',
    borderRadius:    3,
  },
  allCity_text:{
    color:     '#d81e06',
    fontSize:  16,
    textAlign: 'center',
  },
  myChannelTip:{
    color:        '#707070',
    marginTop:    10,
    marginBottom: 10,
    marginLeft:   10,
    width:        '100%',
  },
  segmentedControlIOSBG:{
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  segmentedControlIOS:{
     width: 240,
  },
  scrollView:{
    backgroundColor:  'white',
  },
  downContentContainer:{
    flexDirection:   'row',
    flexWrap:        'wrap',
  },
  contentContainer:{
    marginLeft:      5,
    marginRight:     5,
    // backgroundColor: 'yellow',
    flexDirection:   'row',
    flexWrap:        'wrap',
  },
  flatList_item:{
    marginLeft:      5,
    marginRight:     5,
    marginTop:       5,
    marginBottom:    5,
    height:          40,
    width:           itemHeight,
    justifyContent:  'center',
    alignItems:      'center',
    backgroundColor: 'rgb(244,245,247)',
    borderRadius:    3,
  },
  flatList_item_text:{
    color:     '#333333',
    fontSize:  14,
    textAlign: 'center',
  },

 
});

