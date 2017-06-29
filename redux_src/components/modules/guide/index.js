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
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
  Animated,
  DeviceEventEmitter,
  AsyncStorage,
} from 'react-native';


export const screenWidth = Dimensions.get('window').width
export const screenHeight = Dimensions.get('window').height

import NavigationBar from '../../../common/NavigationBar'
import DataRepository from '../../../common/netWork'

export default class Guide extends Component {
  constructor(props) {
    super(props);
    // props.navigation.setParams({isNormal: false})
    this.state = {
    };
  }
  componentWillMount(){

  }
  componentDidMount(){     
    AsyncStorage.setItem('APPGuideInstalled',JSON.stringify('TRUE'),(error,result) =>{
      if (!error) {
        // Alert.alert('成功保存')
      }
    })
  }
  _onScroll(e){
    const {contentInset, contentOffset,contentSize,layoutMeasurement} = e.nativeEvent
  }
  _register(){
    if (this.props.register) {
      this.props.register()
    }
  }
  _goLook(){
    if (this.props.goLook) {
      this.props.goLook()
    }
  }
  render() {

    return (
      <View style = {styles.container}>
          <ScrollView 
            scrollEventThrottle            = {10}
            onScroll                       = {this._onScroll.bind(this)}
            showsHorizontalScrollIndicator = {false}
            showsVerticalScrollIndicator   = {false}
            horizontal                     = {true}
            pagingEnabled                  = {true}
            // alwaysBounceHorizontal      = {false}
            // alwaysBounceVertical        = {false}
            bounces                        = {false}
          >
          <View style = {styles.scrollViewContainer}>
          {
            [
              {url: require('../../../resources/images/guide/01_750x1334.jpg')},
              {url: require('../../../resources/images/guide/02_0_750x1134.jpg')},
              {url: require('../../../resources/images/guide/02_1_7500x1334.jpg')},
              {url: require('../../../resources/images/guide/03_750x1334.jpg')},
            ].map((item,index) =>{
              return  <View key = {index} style = {styles.scrollViewItem}>
                        <Image source = {item.url} style = {styles.scrollViewItemImage}/>
                        {
                          index == 3 ? 
                          <View style = {styles.register_golook}>
                            <TouchableOpacity style = {styles.register} onPress = {this._register.bind(this)}>
                            </TouchableOpacity>
                            <TouchableOpacity style = {styles.goLook} onPress = {this._goLook.bind(this)}>
                            </TouchableOpacity>
                          </View> 
                          :
                          null
                        }
                      </View>
            })
          }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    position: 'absolute',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'rgb(247,247,242)',
  },
  scrollViewContainer:{
    // width:           '100%',
    // height:          '100%',
    // backgroundColor: 'transparent',
    flexDirection : 'row',
  },
  scrollViewItem:{
    
  },
  scrollViewItemImage:{
    width:  screenWidth,
    height: screenHeight,
  },
  register_golook:{
    // position:        'absolute',
    flexDirection:   'row',
    bottom:          140,
    left:            0,
    right:           0,
    // backgroundColor: 'orange',
    alignItems:      'center',
    justifyContent:  'center',
  },
  register:{
    width:           134,
    // marginTop:    0,
    // marginBottom: 20,
    marginRight:     16,
    // backgroundColor: 'yellow',
    height:          43,
    // textAlign:    'center',
  },
  goLook:{
    width:           134,
    marginLeft:      16,
    // backgroundColor: 'red',
    height:          43,
    // textAlign:    'center',
    // marginTop:    20,
    // marginBottom: 20,
  },
});
