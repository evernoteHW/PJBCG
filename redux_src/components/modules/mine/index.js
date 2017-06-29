
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
  
  StatusBar,
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import Login from '../login'
import ThemeTopic from '../../../common/ThemeTopic'
import DataRepository from '../../../common/netWork'
import PasswordGesture from 'react-native-gesture-password'
import styles from './styles'

export default class Mine extends Component {
 
  static navigationOptions = ({navigation}) => {
      return {
        headerTitle:     '账户中心',
        headerTintColor: 'white',//文字颜色
        headerStyle:     {backgroundColor: 'transparent', position: 'absolute',zIndex: 100,top: 0,left: 0,right: 0,},
        tabBarLabel: '我的',
        tabBarIcon: ({focused,tintColor}) => 
          <Image 
            source = {focused ? require('../../../resources/images/tab/scr_root_mine_selected.png'): require('../../../resources/images/tab/scr_root_mine_normal.png')}
            style  = {{height:20 ,width: 20}}
          />
      }
  }
  componentDidMount(){
    // this.loginSucessNotification = DeviceEventEmitter.addListener('LoginSuccess', (parms)=>{
    //     //登陆成功
    //     this.getHomeData(parms)
    // });

    const { mineActions } = this.props
    mineActions.updateMineData()
  }
  componentWillUnmount(){
    // this.loginSucessNotification.remove()
  }

  render() {
        const { fetchResult,onClick,mineActions } = this.props
        const { navigate } = this.props.navigation;
        let userData = fetchResult.userData
        if (userData === undefined) {
          return null
        }
        return (
          <View style = {styles.container}>
           <StatusBar barStyle="light-content" />
            <ScrollView style = {styles.scrollView}>
              <View style = {styles.containerView}>
                <Image 
                  style = {styles.headerBg} 
                  source = {require('../../../resources/images/mine/mine_top_header_bg.png')}
                />
                <View style = {styles.header}>
                  <View style = {styles.headerTop}>  
                      <Image 
                        style = {styles.headerIcon} 
                        // source = {require('../../../images/mine/mine_top_default_icon.png')}
                        source = {{url: userData.personalHead}}
                      />
                      <Text style = {styles.headerNickName}>{userData.realName}</Text>
                          <TouchableOpacity 
                              style   = {styles.headerTopRight} 
                              // onPress = {() => onClick(userData)}
                              onPress = {() => mineActions.pushCtrl(userData)}
                              // onPress = {() => onClick()}
                          >
                         <Image source = {require('../../../resources/images/mine/mine_header_top_setting.png')} style = {styles.headerTopRightIcon} /> 
                         <Text style = {styles.headerTopRightText}>账户管理</Text>
                         <Image source = {require('../../../resources/images/mine/mine_header_top_goto.png')} style = {styles.headerTopRightIcon} />
                      </TouchableOpacity>
                  </View>
                  <View style = {styles.headerBottom}>  
                      <View style = {styles.headerBottomItem}>
                          <Text style = {styles.headerBottomItemText}>{userData.accountSum}</Text>
                          <Text style = {styles.headerBottomItemSubText}>总资产(元)</Text>
                      </View>
                      <View style = {styles.headerBottomSeperator} />
                      <View style = {styles.headerBottomItem}>
                          <Text style = {styles.headerBottomItemText}>{userData.hasPayInterest}</Text>
                          <Text style = {styles.headerBottomItemSubText}>累计收益(元)</Text>
                      </View>
                      <View style = {styles.headerBottomSeperator} />
                      <View style = {styles.headerBottomItem}>
                          <Text style = {styles.headerBottomItemText}>{userData.dueinSum}</Text>
                          <Text style = {styles.headerBottomItemSubText}>待收收益(元)</Text>
                      </View>
                  </View>
                </View>
                <View style = {styles.bottom}>
                    <Text style = {styles.bottomItem1}>
                        <Text style = {styles.bottomItem1LeftText}>可用余额：</Text>
                        <Text style = {styles.bottomItem1RightText}>¥{userData.accountSum}</Text>
                    </Text>
                    <View style = {styles.bottomItem2}>
                        <TouchableOpacity style = {styles.bottomItem2TouchableOpacity}>
                          <Image 
                            source     = {require('../../../resources/images/mine/mine_bottom2_btn_bg.png')} 
                            style      = {styles.bottomItem2Image}
                            resizeMode = 'stretch'
                          >
                              <Text style = {styles.bottomItem2Text}>提现</Text>
                          </Image>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.bottomItem2TouchableOpacity}>
                          <Image 
                            source     = {require('../../../resources/images/mine/mine_bottom2_btn_bg.png')} 
                            style      = {styles.bottomItem2Image}
                            resizeMode = 'stretch'
                          >
                              <Text style = {styles.bottomItem2Text}>充值</Text>
                          </Image>
                        </TouchableOpacity>
                    </View>
                    <Text style = {styles.bottomItem3}>我的投资</Text>
                    <View style = {styles.bottomItem4}>
                       
                       <TouchableOpacity style = {styles.bottomItem4SubItemLeft}>
                          <Image 
                            source = {require('../../../resources/images/mine/mine_bottom4_ppb_icon.png')}
                            style  = {styles.bottomItem4SubItemImage}
                          />
                          <View>
                              <Text style = {styles.bottomItem4SubItemText}>{userData.ttbPlusAmount}</Text>
                              <Text style = {styles.bottomItem4SubItemSubText}>票票宝资产(元)</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.bottomItem4SubItemRight}>
                           <Image 
                            source = {require('../../../resources/images/mine/mine_bottom4_wzb_icon.png')}
                            style  = {styles.bottomItem4SubItemImage}
                          />
                          <View>
                              <Text style = {styles.bottomItem4SubItemText}>{userData.ttbPlusAmount}</Text>
                              <Text style = {styles.bottomItem4SubItemSubText}>玩赚宝资产(元)</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.bottomItem4SubItemLeft}>
                           <Image 
                            source = {require('../../../resources/images/mine/mine_bottom4_yzb_icon.png')}
                            style  = {styles.bottomItem4SubItemImage}
                           />
                           <View>
                              <Text style = {styles.bottomItem4SubItemText}>{userData.forPaySum}</Text>
                              <Text style = {styles.bottomItem4SubItemSubText}>易转宝资产(元)</Text>
                           </View>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.bottomItem4SubItemRight}>
                           <Image 
                            source = {require('../../../resources/images/mine/mine_bottom4_detail_icon.png')}
                            style  = {styles.bottomItem4SubItemImage}
                           />
                           <View>
                              <Text style = {styles.bottomItem4SubItemText}>{userData.ttbPlusAmount}</Text>
                              <Text style = {styles.bottomItem4SubItemSubText}>交易明细资产(元)</Text>
                           </View>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.bottomItem4SubItemRight}>
                           <Image 
                            source = {require('../../../resources/images/mine/mine_bottom4_detail_icon.png')}
                            style  = {styles.bottomItem4SubItemImage}
                           />
                           <View>
                              <Text style = {styles.bottomItem4SubItemText}>{userData.ttbPlusAmount}</Text>
                              <Text style = {styles.bottomItem4SubItemSubText}>交易明细资产(元)</Text>
                           </View>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.bottomItem4SubItemRight}>
                           <Image 
                            source = {require('../../../resources/images/mine/mine_bottom4_detail_icon.png')}
                            style  = {styles.bottomItem4SubItemImage}
                           />
                           <View>
                              <Text style = {styles.bottomItem4SubItemText}>{userData.ttbPlusAmount}</Text>
                              <Text style = {styles.bottomItem4SubItemSubText}>交易明细资产(元)</Text>
                           </View>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.bottomItem5}>
                        <TouchableOpacity style = {styles.bottomItem5SubItem}>
                          <Image 
                            source = {require('../../../resources/images/mine/mine_bottom5_coupon_icon.png')}
                            style  = {styles.bottomItem5SubItemImage}
                          />
                          <Text style = {styles.bottomItem5SubItemText}>优惠券</Text>
                        </TouchableOpacity>
                         <TouchableOpacity style = {styles.bottomItem5SubItem}>
                          <Image 
                            source = {require('../../../resources/images/mine/mine_bottom5_ebank_icon.png')}
                            style  = {styles.bottomItem5SubItemImage}
                           />
                           <Text style = {styles.bottomItem5SubItemText}>E账户</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.bottomItem5SubItem}>
                            <Image 
                              source = {require('../../../resources/images/mine/mine_bottom5_share_icon.png')}
                              style  = {styles.bottomItem5SubItemImage}
                             />
                            <Text style = {styles.bottomItem5SubItemText}>有奖邀请</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.bottomItem5SubItem}>
                          <Image 
                            source = {require('../../../resources/images/mine/mine_bottom5_kefu_icon.png')}
                            style  = {styles.bottomItem5SubItemImage}
                           />
                          <Text style = {styles.bottomItem5SubItemText}>在线客服</Text>
                        </TouchableOpacity>

                    </View>
                    <View style = {styles.bottomItem6}>
                      <View style = {styles.bottomItem6SepertorLeft}/>
                      <Image style = {styles.bankIcon} source = {require('../../../resources/images/home/huaxin_cg_bank_icon.png')}/>
                      <Text style = {styles.bottomItem6Text}>资金由华兴银行存管</Text>
                      <View style = {styles.bottomItem6SepertorRight}/>
                    </View>
                </View>
              </View>
            </ScrollView>
          </View>
      )
  }
}


