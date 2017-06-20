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
} from 'react-native';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
        color:     new Animated.Value(0),
        completed: true,
    };
  }
  componentDidMount(){
    this.notification = DeviceEventEmitter.addListener('ChangeBarStyle', (parms)=>{
      //登陆成功
      // console.log(`parms = ${parms.isNormal}`)
      this.changeBarStyle(parms.isNormal)
    });
  }

  componentWillUnmount(){
    this.notification.remove();
  }
  changeBarStyle(isNormal){

    if (!this.state.completed) {
        return
    }
    if (isNormal) {
      this.setState({completed: false})
    }

    const { leftNormalImage, leftHighlightImage}   = this.props
    const { normalColor, highlightColor}           = this.props

    Animated.spring(
     this.state.color,
     {
        toValue: isNormal ? 0 : 1,
        duration: 3000,
     }).start(()=>{
        //完成
        this.setState({completed: true})
        //动画完成。。。
        // this.leftImage.setNativeProps({source:{leftHighlightImage}})
        // 
        this.titleLabel.setNativeProps({style:{color: isNormal? 'white':'#333333'}})
     }); 

  }
  render() {
    const { navigation }                           = this.props
    const { normalColor, highlightColor}           = this.props
    const { leftNormalImage, leftHighlightImage}   = this.props
    const { rightNormalImage, rightHighlightImage} = this.props
    var color                                      = this.state.color.interpolate({
        inputRange:  [0, 1],
        outputRange: [normalColor, highlightColor]
    });
    return (
          <Animated.View style={[styles.navigationBar,{backgroundColor: color}]}>
            <View style={styles.navigationBarLeftView}>
                {
                 (leftNormalImage || leftHighlightImage) ?
                    <TouchableOpacity 
                         style   = {styles.navigationBarItem} 
                         onPress = {() => navigation.navigate('MessageCenter')}
                         >
                        <Image ref = {(component => this.leftImage = component)} source = {leftNormalImage}/>
                   </TouchableOpacity> : null
                }
            </View>
            <View style = {styles.navigationBarTitleView}>
              <Text ref = {(component)=> this.titleLabel = component }style = {styles.navigationBarTitleText}>首页</Text>
            </View>
            <View style={styles.navigationBarRightView}>
            { 
                (rightNormalImage || rightHighlightImage) ?
                <TouchableOpacity 
                   style = {styles.navigationBarItem} 
                   onPress={() => navigation.navigate('MessageCenter')}
                 >
                 <Image ref = {(component => this.rightImage = component)} source = {rightNormalImage}/>
                </TouchableOpacity> : null
             }
            </View>
         </Animated.View>
    );
  }
}

NavigationBar.defaultProps = {
  title:                 '',
  titleColor:            '#333333',
  header:                '',
  normalColor:           'rgba(255, 255, 255, 0.0)',
  highlightColor:        'rgba(255, 255, 255, 1.0)',
  // leftNormalImage:    ''
  // leftHighlightImage: ''
}
NavigationBar.propTypes = {
  // prop: React.PropTypes.Type
}

const styles = StyleSheet.create({
  navigationBar:{
    // backgroundColor: 'white', 
    // height:       64,
    flexDirection:   'row',
    position:        'absolute', 
    // backgroundColor: 'rgba(255, 255, 255, 1)',
    zIndex:          100,
    top:             0, 
    left:            0, 
    right:           0,
  },
  navigationBarTitleView:{
    // backgroundColor: 'yellow',
    marginTop:       20,
    marginLeft:      5,
    marginRight:     5,
    justifyContent:  'center',
    alignItems:      'center',
    flex:            1,
  },
  navigationBarTitleText:{
    color:      'white',
    textAlign:  'center',
    fontSize:   17,
    fontWeight: 'bold',
  },
  navigationBarLeftView:{
    // backgroundColor: 'orange',
    width:           65,
    marginTop:       20,
    height:          44,
  },
  navigationBarRightView:{
    // backgroundColor: 'orange',
    width:           65,
    marginTop:       20,
    height:          44,
  },
  navigationBarItem:{
    justifyContent: 'center', 
    alignItems:     'center',
    marginRight:    7, 
    height:         30 ,
    width:          58
  },

});
