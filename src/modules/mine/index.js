
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
} from 'react-native';

import { NavigationActions } from 'react-navigation'
import Login from '../login'
import ThemeTopic from '../../common/ThemeTopic'
import DataRepository from '../../common/netWork'

export const screenWidth = Dimensions.get('window').width
export const screenHeight = Dimensions.get('window').height

const navigateAction = NavigationActions.navigate({
  routeName: 'Setting',
  params:    {
    headerUrl : 'https://www.pj.com/img/upload/touxiang/201706051710342287.jpg'
  },
  action:    NavigationActions.navigate({ routeName: 'Setting'})
})

export default class Mine extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userData:    '',
      modalVisible: false,
    }
  }
  static navigationOptions = ({navigation}) => {
      return {
        headerTitle:     '账户中心 存管版',
        headerTintColor: 'white',//文字颜色
        headerStyle:     {backgroundColor: 'transparent', position: 'absolute',zIndex: 100,top: 0,left: 0,right: 0,}
      }
  }
  componentDidMount(){
    this.loginSucessNotification = DeviceEventEmitter.addListener('LoginSuccess', (parms)=>{
        //登陆成功
        this.getHomeData(parms)
    });
    this.getHomeData()
  }
  componentWillUnmount(){
    this.loginSucessNotification.remove()
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
  render() {
        const { navigate } = this.props.navigation;
        return (
          <View style = {styles.container}>
           <StatusBar barStyle="light-content" />
            <ScrollView style = {styles.scrollView}>
              <View style = {styles.containerView}>
                <Image 
                  style = {styles.headerBg} 
                  source = {require('../../images/mine/mine_top_header_bg.png')}
                />
                <View style = {styles.header}>
                  <View style = {styles.headerTop}>  
                      <Image 
                        style = {styles.headerIcon} 
                        // source = {require('../../images/mine/mine_top_default_icon.png')}
                        source = {{url: this.state.userData.personalHead}}
                      />
                      <Text style = {styles.headerNickName}>{this.state.userData.realName}</Text>
                          <TouchableOpacity 
                              style   = {styles.headerTopRight} 
                              onPress = {()=>{
                                  // this.props.navigation.dispatch(navigateAction)
                                  navigate('Setting',{
                                    userData: this.state.userData
                                    // headerUrl: this.state.userData.personalHead,
                                    // realName:  this.state.userData.realName,
                                  })
                              }}
                          >
                         <Image source = {require('../../images/mine/mine_header_top_setting.png')} style = {styles.headerTopRightIcon} /> 
                         <Text style = {styles.headerTopRightText}>账户管理</Text>
                         <Image source = {require('../../images/mine/mine_header_top_goto.png')} style = {styles.headerTopRightIcon} />
                      </TouchableOpacity>
                  </View>
                  <View style = {styles.headerBottom}>  
                      <View style = {styles.headerBottomItem}>
                          <Text style = {styles.headerBottomItemText}>{this.state.userData.accountSum}</Text>
                          <Text style = {styles.headerBottomItemSubText}>总资产(元)</Text>
                      </View>
                      <View style = {styles.headerBottomSeperator} />
                      <View style = {styles.headerBottomItem}>
                          <Text style = {styles.headerBottomItemText}>{this.state.userData.hasPayInterest}</Text>
                          <Text style = {styles.headerBottomItemSubText}>累计收益(元)</Text>
                      </View>
                      <View style = {styles.headerBottomSeperator} />
                      <View style = {styles.headerBottomItem}>
                          <Text style = {styles.headerBottomItemText}>{this.state.userData.dueinSum}</Text>
                          <Text style = {styles.headerBottomItemSubText}>待收收益(元)</Text>
                      </View>
                  </View>
                </View>
                <View style = {styles.bottom}>
                    <Text style = {styles.bottomItem1}>
                        <Text style = {styles.bottomItem1LeftText}>可用余额：</Text>
                        <Text style = {styles.bottomItem1RightText}>¥8450.00</Text>
                    </Text>
                    <View style = {styles.bottomItem2}>
                        <TouchableOpacity style = {styles.bottomItem2TouchableOpacity}>
                          <Image 
                            source     = {require('../../images/mine/mine_bottom2_btn_bg.png')} 
                            style      = {styles.bottomItem2Image}
                            resizeMode = 'stretch'
                          >
                              <Text style = {styles.bottomItem2Text}>提现</Text>
                          </Image>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.bottomItem2TouchableOpacity}>
                          <Image 
                            source     = {require('../../images/mine/mine_bottom2_btn_bg.png')} 
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
                            source = {require('../../images/mine/mine_bottom4_ppb_icon.png')}
                            style  = {styles.bottomItem4SubItemImage}
                          />
                          <View>
                              <Text style = {styles.bottomItem4SubItemText}>{this.state.userData.ttbPlusAmount}</Text>
                              <Text style = {styles.bottomItem4SubItemSubText}>票票宝资产(元)</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.bottomItem4SubItemRight}>
                           <Image 
                            source = {require('../../images/mine/mine_bottom4_wzb_icon.png')}
                            style  = {styles.bottomItem4SubItemImage}
                          />
                          <View>
                              <Text style = {styles.bottomItem4SubItemText}>{this.state.userData.ttbPlusAmount}</Text>
                              <Text style = {styles.bottomItem4SubItemSubText}>玩赚宝资产(元)</Text>
                          </View>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.bottomItem4SubItemLeft}>
                           <Image 
                            source = {require('../../images/mine/mine_bottom4_yzb_icon.png')}
                            style  = {styles.bottomItem4SubItemImage}
                           />
                           <View>
                              <Text style = {styles.bottomItem4SubItemText}>{this.state.userData.forPaySum}</Text>
                              <Text style = {styles.bottomItem4SubItemSubText}>易转宝资产(元)</Text>
                           </View>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.bottomItem4SubItemRight}>
                           <Image 
                            source = {require('../../images/mine/mine_bottom4_detail_icon.png')}
                            style  = {styles.bottomItem4SubItemImage}
                           />
                           <View>
                              <Text style = {styles.bottomItem4SubItemText}>{this.state.userData.ttbPlusAmount}</Text>
                              <Text style = {styles.bottomItem4SubItemSubText}>交易明细资产(元)</Text>
                           </View>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.bottomItem4SubItemRight}>
                           <Image 
                            source = {require('../../images/mine/mine_bottom4_detail_icon.png')}
                            style  = {styles.bottomItem4SubItemImage}
                           />
                           <View>
                              <Text style = {styles.bottomItem4SubItemText}>{this.state.userData.ttbPlusAmount}</Text>
                              <Text style = {styles.bottomItem4SubItemSubText}>交易明细资产(元)</Text>
                           </View>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.bottomItem4SubItemRight}>
                           <Image 
                            source = {require('../../images/mine/mine_bottom4_detail_icon.png')}
                            style  = {styles.bottomItem4SubItemImage}
                           />
                           <View>
                              <Text style = {styles.bottomItem4SubItemText}>{this.state.userData.ttbPlusAmount}</Text>
                              <Text style = {styles.bottomItem4SubItemSubText}>交易明细资产(元)</Text>
                           </View>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.bottomItem5}>
                        <TouchableOpacity style = {styles.bottomItem5SubItem}>
                          <Image 
                            source = {require('../../images/mine/mine_bottom5_coupon_icon.png')}
                            style  = {styles.bottomItem5SubItemImage}
                          />
                          <Text style = {styles.bottomItem5SubItemText}>优惠券</Text>
                        </TouchableOpacity>
                         <TouchableOpacity style = {styles.bottomItem5SubItem}>
                          <Image 
                            source = {require('../../images/mine/mine_bottom5_ebank_icon.png')}
                            style  = {styles.bottomItem5SubItemImage}
                           />
                           <Text style = {styles.bottomItem5SubItemText}>E账户</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.bottomItem5SubItem}>
                            <Image 
                              source = {require('../../images/mine/mine_bottom5_share_icon.png')}
                              style  = {styles.bottomItem5SubItemImage}
                             />
                            <Text style = {styles.bottomItem5SubItemText}>有奖邀请</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style = {styles.bottomItem5SubItem}>
                          <Image 
                            source = {require('../../images/mine/mine_bottom5_kefu_icon.png')}
                            style  = {styles.bottomItem5SubItemImage}
                           />
                          <Text style = {styles.bottomItem5SubItemText}>在线客服</Text>
                        </TouchableOpacity>

                    </View>
                    <View style = {styles.bottomItem6}>
                      <View style = {styles.bottomItem6SepertorLeft}/>
                      <Image style = {styles.bankIcon} source = {require('../../images/home/huaxin_cg_bank_icon.png')}/>
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

const styles = StyleSheet.create({
  container: {
    flex:            1,
    // flexDirection:  'row',
    backgroundColor: 'rgb(244,245,247)',
  },
  scrollView:{
    backgroundColor: 'white',
    flex:            1,
  },
  containerView:{
    flex:            1,
    // backgroundColor: 'white',
    // backgroundColor: 'orange',
  },
  headerBg:{
    height: 440/3.0
  },
  header:{
    position:        'absolute',
    // flexDirection:   'row',
    backgroundColor: 'white',
    shadowColor:     '#3a3433',
    shadowOffset:    {width: 0,height: 10},
    shadowRadius:    10,
    shadowOpacity:   0.15,
    left:            10,
    right:           10,
    top:             84,
    // height:          100,
    borderRadius:    5,
  },
  headerTop:{
    marginLeft:    15,
    marginTop:     15,
    flexDirection: 'row',
    alignItems:    'center',
  },
  headerTopRight:{
    alignItems:    'center',
    // right:      0,
    marginRight:   10,
    flexDirection: 'row'
  },
  headerTopRightText:{
    marginLeft: 5,
    color: '#8a8a8a'
  },
  headerTopRightIcon:{
    width: 15,
    height: 15,
  },
  headerIcon:{
    width:           50,
    height:          50,
    borderRadius:    25,
    // backgroundColor: 'orange',
  },
  headerNickName:{
    flex:               1,
    color:              '#333333',
    marginLeft:         10,
    fontSize:           16,
    // backgroundColor: 'yellow',
  },
  headerBottom:{
    marginBottom:   15,
    marginTop:      10,
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'center',
  },
  headerBottomItem:{
    flex: 3
  },
  headerBottomSeperator:{
    width:           1,
    backgroundColor: 'rgb(247,246,242)',
    height:          30,
  },
  headerBottomItemText:{
    color:        '#333333',
    marginBottom: 5,
    textAlign:    'center',
  },
  headerBottomItemSubText:{
    textAlign: 'center',
    color:     '#666666'
  },
  bottom:{
    marginLeft:    15,
    // marginTop:     200,
    marginRight: 15,
    
    // backgroundColor: 'white',
    flex:            1,
  },
  bottomItem1:{
    marginTop:     110,
  },
  bottomItem1LeftText:{
    color:    '#333333',
    fontSize: 14,
  },
  bottomItem1RightText:{
    color: '#e94e4e',
    fontSize: 27,
    // fontWeight: 'bold',
  },
  bottomItem2:{
    flex:           1,
    marginTop:      5,
    flexDirection:  'row',
    justifyContent: 'space-between',
  },
  bottomItem2TouchableOpacity:{
    flex:               2,
    // marginRight:     10,
    // backgroundColor: 'orange',
    // height:          60,
    alignItems:         'center',
    justifyContent:     'center',
  },
  bottomItem2Image:{
    flex:            1,
    marginTop:       0,
    marginLeft:      0,
    marginRight:     0,
    marginBottom:    0,
    // backgroundColor: 'red',
    width:        180,
    height:       168/3.0,
    alignItems:      'center',
    justifyContent:  'center',
  },
  bottomItem2Text:{
    backgroundColor: 'transparent',
    color:           'white',
    marginBottom:    5,
    fontSize:        15,
  },
  bottomItem3:{
    marginTop: 30,
    color:     '#666666'
  },
  bottomItem4:{
    marginTop:          10,
    flexDirection:      'row',
    flexWrap:           'wrap',
    // backgroundColor: 'red'
  },
  bottomItem4SubItemLeft:{
    width:           (screenWidth - 30 )/2.0,
    backgroundColor: 'white',
    // marginTop:       1,
    // marginRight:     1,
    flexDirection:   'row',
    alignItems:      'center',
  },
  bottomItem4SubItemRight:{
    width:           (screenWidth - 30 )/2.0,
    backgroundColor: 'white',
    // marginTop:    1,
    // marginRight:  1,
    flexDirection:   'row',
    alignItems:      'center',
  },
  bottomItem4SubItemImage:{
    marginTop: 10,
    marginRight: 5,
    marginBottom: 10,
    width:  130/3.0,
    height: 130/3.0,
  },
  bottomItem4SubItemText:{
    color:    '#333333',
    fontSize: 16,
  },
  bottomItem4SubItemSubText:{
    color:     '#666666',
    fontSize:  12,
    marginTop: 2,
  },
  bottomItem5:{
    flexDirection:   'row',
    marginTop:       10,
    backgroundColor: 'white',
    shadowColor:     '#3a3433',
    shadowOffset:    {width: 0,height: 10},
    shadowRadius:    10,
    shadowOpacity:   0.15,
    // left:         10,
    // right:        10,
    // top:          84,
    // height:       100,
    borderRadius:    5,
  },
  bottomItem5SubItem:{
    flex:           4,
    alignItems:     'center',
    justifyContent: 'center',
  },
  bottomItem5SubItemImage:{
    marginTop: 15,
    marginRight: 5,
    marginBottom: 10,
    width:  102/3.0,
    height: 65/3.0,
  },
  bottomItem5SubItemText:{
    color: '#666666',
    marginBottom: 13,
  },
  bottomItem6:{
    marginTop:      30,
    marginBottom:   30,
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'center',
  },
  bottomItem6Text:{
    color:      '#333333',
    marginLeft: 5,
  },
  bottomItem6SepertorLeft:{
    flex: 4,
    backgroundColor: 'rgb(242,238,235)',
    height: 0.5,
    marginRight: 5,
  },
   bottomItem6SepertorRight:{
    flex:            4,
    backgroundColor: 'rgb(242,238,235)',
    height:          0.5,
    marginLeft:      5,
  },
});
