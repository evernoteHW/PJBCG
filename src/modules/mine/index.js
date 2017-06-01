
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ListView,
  RefreshControl,
  Platform,
  TouchableOpacity,
  ScrollView,
  Button,
  Image,
  FlatList,
  SectionList,
  Modal,
  AsyncStorage,
  DeviceEventEmitter,

} from 'react-native';

import { NavigationActions } from 'react-navigation'
import Login from '../login'
import ThemeTopic from '../../common/ThemeTopic'

const navigateAction = NavigationActions.navigate({
  routeName: 'Setting',
  params:    {},
  action:    NavigationActions.navigate({ routeName: 'Setting'})
})

export default class Mine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userModel:    undefined,
      modalVisible: false,
      listData:     [],
    }
  }
  static navigationOptions = ({navigation}) => {
      return {
        header: null
      }
  }
  componentDidMount(){
    // ThemeTopic.updateTheme()

    this.setState({
       listData:     [
              {
                data: [
                        {
                          title:    '主题切换',
                          subTitle: '',
                          url:      require('../../images/mine/mine_list_exchange.png'),
                        },
                        {
                          title:    '动态',
                          subTitle: '',
                          url:      require('../../images/mine/mine_list_dynamic.png'),
                        },
                        {
                          title:    '收藏',
                          subTitle: '',
                          url:      require('../../images/mine/mine_list_collect.png'),
                        },
                        {
                          title:    '消息',
                          subTitle: '',
                          url:      require('../../images/mine/mine_list_message.png'),
                        },
                      ],
                key: '0'
              },
              {
                data: [
                        {
                          title:    '设置',
                          subTitle: '',
                          url:      require('../../images/mine/mine_list_setting.png'),
                        }
                      ],
                key: '1',
              },
              {
                data: [
                        {
                          title:    '意见反馈',
                          subTitle: '',
                          url:      require('../../images/mine/mine_list_feedback.png'),
                        }
                      ],
                key: '2',
              },
        ],
    })
  }
  _selectedIndex = (item,index) =>{
    //更换主题
    AsyncStorage.getItem('ThemeTopic').then((value) =>{
      if (value === '88888') {
        AsyncStorage.setItem('ThemeTopic','99999')
      }else{
        AsyncStorage.setItem('ThemeTopic','88888')
      }
      DeviceEventEmitter.emit('ThemeChanged');
    })

  }
  renderItem = ({item, index}) =>{
      return( 
          <TouchableOpacity 
            style   = {{backgroundColor: 'white', flexDirection: 'row', height: 50,alignItems: 'center'}}
            onPress = {()=> this._selectedIndex(item,index)}
          >
            <Image 
              source = {item.url} 
              style  = {{width: 20, height: 20,marginLeft: 10}}
            />
            <Text style = {{marginLeft: 10, fontSize: 14}}>{item.title}</Text>
            <Text style = {{marginLeft: 5, color: 'gray', fontSize: 12}}>{item.subTitle}</Text>
          </TouchableOpacity>
      )
    }
    _onPress(){
      this.setState({modalVisible: true})
    }
    _cancel(){
      this.setState({modalVisible: false})
    }
    _login(){
     this.setState({modalVisible: false}) 
    }
    _listHeaderComponent = () =>{
      return (<View>
                <View style = {styles.headerTip}>
                  <Image 
                    style  = {styles.quotation}
                    source = {require('../../images/mine/mine_list_head_quotation_left.png')}
                  />
                  <Text style = {styles.text}>一键登录 享受私人定制</Text>
                  <Image 
                    style  = {styles.quotation}
                    source = {require('../../images/mine/mine_list_head_quotation_right.png')}
                  />
                </View>
                <View style = {styles.headerItems}>
                {
                      [
                         require('../../images/mine/mian_list_head_wechat.png'),
                         require('../../images/mine/mian_list_head_qq.png'),
                         require('../../images/mine/mian_list_head_phone.png')
                      ].map((name,index) => {
                        return <TouchableOpacity
                                  onPress = {this._onPress.bind(this)}
                                  key    = {index} 
                               >
                                  <Image 
                                    source = {name}
                                    style  = {{width: 60, height: 60}}
                                 /> 
                               </TouchableOpacity>
                      })
                }
                  
                </View>
              </View>
      )
    }
    _sectionSeparatorComponent = () =>{
      return( <View style={{flex:1,height:10}} /> )
    }
    _itemSeparatorComponent = () =>{
      return( <View style={{flex:1,height:1}} /> )
    }
    render() {
        const { navigate } = this.props.navigation;
        return (
          <View style={styles.container}>
            <SectionList 
                style                     = {styles.sectionList}
                sections                  = {this.state.listData}
                renderItem                = {this.renderItem}
                keyExtractor              = {(item,index) => `${index}`}
                SectionSeparatorComponent = {this._sectionSeparatorComponent}
                ItemSeparatorComponent    = {this._itemSeparatorComponent}
                ListHeaderComponent       = {this._listHeaderComponent}
                removeClippedSubviews     = {false}
            />
          <Modal
            animationType  = {'slide'}
            transparent    = {false}
            visible        = {this.state.modalVisible}
            onRequestClose = {() => {alert("Modal has been closed.")}}
          >
            <Login 
              cancel = {this._cancel.bind(this)} 
              login  = {this._login.bind(this)}
            />
          </Modal>
          </View>
          
      )
  }
}

const styles = StyleSheet.create({
  container: {
    flex:            1,
    // flexDirection:  'row',
    backgroundColor: 'rgb(244,245,247)',
  },
  sectionList:{
    backgroundColor: 'rgb(244,245,247)', 
    width: '100%',
  },
  contentContainer: {
    // position:           'absoulute',
    // // width:              '100%',
    // left : 0,
    // right: 0,
    // bottom: 0,
    // top: 100,
    // resizeMode:         'cover'
    // paddingBottom:   49,
    // height: screenHeight - 49 - 64,
    // backgroundColor: 'red',
  },
  headerItems:{
    marginLeft:     25,
    marginRight:    25,
    marginBottom:   20,
    flexDirection:  'row',
    justifyContent: 'space-around',
  },
  headerTip:{
    flexDirection: 'row',
    marginBottom:    30,
    marginTop:       40,
    justifyContent:  'center',
    alignItems:      'center',
    // backgroundColor: '#123456',
  },
  text: {
    color: '#666666'
  },
  quotation:{
    width:           21,
    height:          21,
  },
  headerBg:{
    // flex:       1,
    // resizeMode: 'cover',
    // alignSelf:  'auto',
    // width:      '100%',
    // height:     300,
    // flex:       1,
    width:           "100%",
    height:          '100%',
    backgroundColor: '#123456', 
  },
  header:{
    justifyContent:  'center', 
    alignItems:      'center',
    height:          200
  },
  // headerIcon:{
  //   left:         (screenWidth - 80)/2.0,
  //   position:     'absolute', 
  //   width:        80,
  //   height:       80,
  //   borderRadius: 40,
  //   backgroundColor: '#123456',
  // },
  loginBtn: {
    justifyContent: 'center', 
    alignItems:     'center',
    marginLeft:     7, 
    height:         30 ,
    width:          100, 
    marginLeft:     10, 
    borderWidth:    0.5,
    borderColor:    '#999999'
  },
  registerBtn: {
    justifyContent: 'center', 
    alignItems:     'center',
    marginRight:    10, 
    height:         30 ,
    width:          100, 
    borderWidth:    0.5, 
    borderColor:    '#999999'
  },
  instructions: {
    textAlign:    'center',
    color:        '#333333',
    marginBottom: 5,
  },
});
