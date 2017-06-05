
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
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import Login from '../login'
import ThemeTopic from '../../common/ThemeTopic'
import DataRepository from '../../common/netWork'

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
                          title:    '昵称',
                          subTitle: '',
                          // url:      require('../../images/mine/mine_list_exchange.png'),
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
                        },
                        {
                          title:    '登陆密码',
                          subTitle: '',
                          url:      require('../../images/settings/setting_login_password.png'),
                        },
                        {
                          title:    '手势密码',
                          subTitle: '',
                          url:      require('../../images/settings/setting_gesture_lock.png'),
                        },
                        {
                          title:    '修改手势密码',
                          subTitle: '',
                          url:      require('../../images/settings/setting_gesture_unlock.png'),
                        },
                        {
                          title:    '指纹解锁',
                          subTitle: '',
                          url:      require('../../images/settings/setting_finger_gesture.png'),
                        },
                      ],
                key: '1'
              },
              {
                data: [
                        {
                          title:    '关于我们',
                          subTitle: '',
                          url:      require('../../images/settings/setting_feed_back.png'),
                        },
                        {
                          title:    '问题反馈',
                          subTitle: '',
                          url:      require('../../images/settings/setting_feed_back.png'),
                        },
                        {
                          title:    '检查更新',
                          subTitle: '',
                          url:      require('../../images/settings/setting_check_update.png'),
                        }
                      ],
                key: '2',
              },
              {
                data: [
                        {
                          title:    '退出登录',
                          subTitle: '',
                          // url:      require('../../images/mine/mine_list_feedback.png'),
                        }
                      ],
                key: '3',
              },
        ],
      modalVisible: false,
    }
  }
  static navigationOptions = ({navigation}) => {
      return {
        headerTitle: '账户中心 存管版',
        headerTintColor : '#333333',//文字颜色
        headerStyle: {backgroundColor: 'white',}
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
    AsyncStorage.getItem('PJBLoginInfo').then((value) => {
      let jsonValue = JSON.parse((value));
      const {access_token,expires_in,refresh_token,scope,token_type} = jsonValue
      console.log(`access_token = ${access_token} expires_in = ${expires_in} refresh_token = ${refresh_token} scope = ${scope} token_type=${token_type}`);
       DataRepository.fetchNormalNetRepository('rest/userHome/v1.4/homeInit',{
      },`${token_type} ${access_token}`).then(data => {
          this.setState({userData: data.result})
      }) 
    })
  }

  renderItem = ({item, index}) =>{
      return( 
          <TouchableOpacity 
            style   = {{backgroundColor: 'white', flexDirection: 'row', height: 50,alignItems: 'center'}}
            // onPress = {()=> this._selectedIndex(item,index)}
          >
            <Image 
              source = {item.url} 
              style  = {{width: 24, height: 24,marginLeft: 10}}
            />
            <Text style = {{marginLeft: 10, fontSize: 14}}>{item.title}</Text>
            <Text style = {{marginLeft: 5, color: '#3a3434', fontSize: 12}}>{item.subTitle}</Text>
          </TouchableOpacity>
      )
  }
  _listHeaderComponent = () =>{
      return( <View style={{flex:1,height:15}} /> )
  }
  _sectionSeparatorComponent = () =>{
      return( <View style={{flex:1,height:15}} /> )
  }
  _itemSeparatorComponent = () =>{
    return( <View style={{flex:1,height:1}} /> )
  }
  render() {
        const { navigate } = this.props.navigation;
        return (
          <View style = {styles.container}>
              <StatusBar barStyle="default" />
                <SectionList 
                  // style                     = {styles.sectionList}
                  sections                  = {this.state.sectionListData}
                  renderItem                = {this.renderItem}
                  keyExtractor              = {(item,index) => `${index}`}
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
