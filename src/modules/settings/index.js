
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
  Dimensions,
  StatusBar,
  Alert,
  AlertIOS,
  Switch,
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import Login from '../login'
import ThemeTopic from '../../common/ThemeTopic'
import DataRepository from '../../common/netWork'


const element = (
  <Text className="greeting">
    Hello, world!
  </Text>
);


export const screenWidth = Dimensions.get('window').width
export const screenHeight = Dimensions.get('window').height

const navigateAction = NavigationActions.navigate({
  routeName: 'Setting',
  params:    {},
  action: NavigationActions.navigate({ routeName: 'Setting'})
})

export default class Setting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionListData: [
              {
                data: [
                        {
                          title:    props.navigation.state.params.userData.realName,
                          subTitle: ' ',
                          url:      props.navigation.state.params.userData.personalHead,
                          section:  0,
                        },
                      ],
                key: '0'
              },
              {
                data: [
                        {
                          title:    '交易密码',
                          subTitle: '',
                          url:      require('../../images/settings/setting_deal_password.png'),
                          section:  1,
                        },
                        {
                          title:    '登录密码',
                          subTitle: '',
                          url:      require('../../images/settings/setting_login_password.png'),
                          section:  1,
                        },
                        {
                          title:    '手势密码',
                          subTitle: '',
                          url:      require('../../images/settings/setting_gesture_lock.png'),
                          section:  1,
                        },
                        {
                          title:    '修改手势密码',
                          subTitle: '',
                          url:      require('../../images/settings/setting_gesture_unlock.png'),
                          section:  1,

                        },
                        {
                          title:    '指纹解锁',
                          subTitle: '',
                          url:      require('../../images/settings/setting_finger_gesture.png'),
                          section:  1,
                        },
                      ],
                key: '1'
              },
              {
                data: [
                        {
                          title:    '关于我们',
                          subTitle: '',
                          url:      require('../../images/settings/setting_icon_about_us.png'),
                          section:  2,
                        },
                        {
                          title:    '问题反馈',
                          subTitle: '',
                          url:      require('../../images/settings/setting_feed_back.png'),
                          section:  2,
                        },
                        {
                          title:    '检查更新',
                          subTitle: '',
                          url:      require('../../images/settings/setting_check_update.png'),
                          section:  2,
                        }
                      ],
                key: '2',
              },
              {
                data: [
                        {
                          title:    '退出登录',
                          subTitle: '  ',
                          // url:      require('../../images/mine/mine_list_feedback.png'),
                          section:  3,
                        }
                      ],
                key: '3',
              },
        ],
      modalVisible:    false,
      gestureSwitchOn: false,
      fingerSwitchOn:  false,
    }
  }
  static navigationOptions = ({navigation}) => {
      return {
        headerTitle:     '设置',
        headerTintColor: '#333333',//文字颜色
        headerStyle:     {backgroundColor: 'white',},
        headerLeft:      (
          <TouchableOpacity 
              style   = {{width: 65,height: 44, justifyContent: 'center',backgroundColor: 'transparent'}}
              onPress = {()=> navigation.goBack()}
          >
            <Image 
              source = {require('../../images/common/common_return_btn_black.png')}
              style = {{marginLeft:10, width: 20, height:20,backgroundColor: 'transparent'}}
            />
          </TouchableOpacity>
        )
      }
  }
  componentDidMount(){
    //
    //  DataRepository.fetchNetRepository('rest/userHome/v1.4/homeInit',{
    // },true).then(data => {
    //     //登陆成功 
    // }) 
    // this.getHomeData()
  }
  getHomeData(){
       DataRepository.fetchNormalNetRepository('rest/userHome/v1.4/homeInit',{
      },`${token_type} ${access_token}`).then(data => {
          this.setState({userData: data.result})
      }) 
  }
  _selectedIndex(item,index){
    if (item.section == 0 && index==0) {
        this.props.navigation.navigate('PersonHomePage',{
          userData: this.props.navigation.state.params.userData
        })
    }else if (item.section == 1){
        if (index == 0) {

          AlertIOS.alert('修改交易密码', '', [
            { text:'取消' },
            { text:'确认', onPress: ()=>{
              // this.sendMobilePhoneSMS()
              AlertIOS.prompt(
                  '修改交易密码',
                  '',
                  [
                    {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: '确认', onPress: inputValue => 
                      this.resetDealpwd(inputValue.login,inputValue.password)
                    },
                  ],
                  'login-password',
                  '',
                  'number-pad',
               );
              } 
            },
          ]);
         
   
        }else  if (index == 1) {

          AlertIOS.alert('修改登录密码', '', [
            { text:'取消' },
            { text:'确认', onPress: ()=>{
  
                AlertIOS.prompt(
                    '修改交易密码',
                    '',
                    [
                      {text: '取消', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                      {text: '确认', onPress: inputValue => {
                          this.updateLoginPwd(inputValue.login,inputValue.password)
                        }
                      },
                    ],
                    'login-password',
                    '',
                    'number-pad',
                 );
                }
              },
            ]
          );
        }else  if (index == 2) {
  
        }
    }
  }
  //先发短信 rest/user/v1.1/sendMobilePhoneSMS
  sendMobilePhoneSMS(){
     DataRepository.fetchNormalNetRepository('rest/user/v1.1/sendMobilePhoneSMS',{
        sendType: '3',
      }).then(data => {
          if (data.result.success) {
              Alert.alert(`验证码发送成功 过期时间${data.result.remainTime}`)
          }
      }) 
  }
  resetDealpwd(code,password){
      DataRepository.fetchNormalNetRepository('rest/user/v1/resetDealpwd',{
        dealpwd: password,
        code:    code,
      }).then(data => {
        if (data.result == 'SUCCESS') {
          Alert.alert('修改成功')
        }
      }) 
  }
  updateLoginPwd(oldPassword,newPassword){
      DataRepository.fetchNormalNetRepository('rest/user/v1/updateLoginPwd',{
        oldPassword: oldPassword,
        newPassword:    newPassword,
      }).then(data => {
        if (data.result == 'SUCCESS') {
          Alert.alert('修改成功')
        }
      }) 
  }
  //开启关闭手势密码
  //修改手势密码
  //指纹解锁
  renderItem = ({item, index}) =>{
    if (item.section != 3) {
      return( 
          <TouchableOpacity 
            style   = {{backgroundColor: 'white', flexDirection: 'row', height: 50,alignItems: 'center'}}
            onPress = {()=> this._selectedIndex(item,index)}
          >
              <Image 
                source = {item.section == 0 ? {url : item.url} :item.url} 
                style  = {{width: 24, height: 24,marginLeft: 10, borderRadius: 12}}
              />
              <Text style = {{marginLeft: 10, fontSize: 14}}>{item.title}</Text>
              {element}
              <Text style = {{marginLeft: 5, color: 'rgb(97,100,109)', fontSize: 12, flex: 1}}>{item.subTitle}</Text>
              {
               ((item.section == 1 && index == 2) || (item.section == 1 && index == 4))?
                <Switch 
                  // disabled          = {true}
                  style             = {{marginRight: 10}}
                  value             = {index == 2 ? this.gestureSwitchOn: this.fingerSwitchOn}
                  onTintColor       = {'red'}
                  // thumbTintColor = {'orange'}
                  onValueChange     = {value => {
                    Alert.alert(`value == ${value}`)
                    if (index == 2) {
                        this.setState({
                          gestureSwitchOn: true
                        })
                    }else{
                       this.setState({
                          fingerSwitchOn: value
                        })
                    }
                  }}
                />
                :
               <Image 
                source = {require('../../images/settings/setting_forward_indicicar.png')} 
                style  = {{width: 15, height: 15,right: 10,}}
              />
              }
          </TouchableOpacity>
      )
    }else{
       return( 
          <TouchableOpacity 
            style   = {{backgroundColor: 'white', flexDirection: 'row', height: 50,alignItems: 'center',justifyContent: 'center'}}
            // onPress = {()=> this._selectedIndex(item,index)}
          >
              <Text style = {{marginLeft: 10, fontSize: 14,textAlign: 'center',color: 'rgb(208,14,44)'}}>{item.title}</Text>
          </TouchableOpacity>
      )
    }
  }
  _listHeaderComponent = ()=> <View style={{flex:1,height:15}} />
  _sectionSeparatorComponent = ()=> <View style={{flex:1,height:15}} />
  _itemSeparatorComponent = ()=> <View style={{flex:1,height:1}} />

  render() {
        const { navigate } = this.props.navigation;
        return (
          <View style = {styles.container}>
              <StatusBar barStyle="default" />
                <SectionList 
                  // style                     = {styles.sectionList}
                  sections                  = {this.state.sectionListData}
                  renderItem                = {this.renderItem}
                  keyExtractor              = {(item,index) => `。。。。${index}`}
                  SectionSeparatorComponent = {this._sectionSeparatorComponent}
                  ItemSeparatorComponent    = {this._itemSeparatorComponent}
                  ListHeaderComponent       = {this._listHeaderComponent}
                  // removeClippedSubviews     = {false}
                />
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
 
});
