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

export default class SingleItemsMap extends Component {
  constructor(props) {
    super(props);
    this.state = { scroll: true };
  }
  onPanResponderRelease = (movePanGesture,index,moveBehindPoint,callback) => {
   
      const  { itemData , animationFinished ,animationBegin} = this.props;
     
      var replacePanGesture = undefined
      for (var i = 0; i < itemData.length; i++) {
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
        movePanGesture.startMove(frame_from,frame_to,animationFinished)
        replacePanGesture.startMove(frame_to,frame_from,animationFinished)
      }else{
        movePanGesture.restart(animationFinished)
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
  renderItem = (item,index) => {
    const  { renderItem } = this.props;
    return  renderItem ? renderItem() : <TouchableOpacity  style = {styles.flatList_item} >
              <Text style = {styles.flatList_item_text}>{item.key}</Text>
            </TouchableOpacity>
  }
  render() {

    const  { itemData , animationBegin} = this.props;
    return ( <View 
               ref = {(component) => this.downScrollViewContainer = component} 
               style = {styles.downContentContainer}>
               {
                itemData.map((item,index) => {
                  return  <PanGestureView
                            index                 = {index}
                            ref                   = {`PanGestureView_${index}`}
                            key                   = {index}
                            onPanResponderRelease = {this.onPanResponderRelease}
                            onPanResponderGrant   = {() => { animationBegin() }}
                          >
                          {this.renderItem(item,index)}
                          </PanGestureView>
                })
              }
           </View>
    );
  }
}
SingleItemsMap.propTypes = {
    itemData:          React.PropTypes.array,
    animationBegin:    React.PropTypes.func,
    animationFinished: React.PropTypes.func,
    renderItem:        React.PropTypes.func,
}
SingleItemsMap.defaultProps = {
    itemData:            [],
    animationBegin:      ()=> {},
    animationFinished:   ()=> {},
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

