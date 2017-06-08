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

import NavigationBar from '../../common/NavigationBar'
import RootViewPage from './RootViewPage'
import DataRepository from '../../common/netWork'
import RecommendModel from '../../models/RecommendModel'

import { NavigationActions } from 'react-navigation'

const navigateAction = NavigationActions.navigate({
  routeName: 'Setting',
  params:    {},
  action: NavigationActions.navigate({ routeName: 'Setting'})
})

export default class Home extends Component {
  constructor(props) {
    super(props);
    // props.navigation.setParams({isNormal: false})
    this.state = {
    };
  }
  static navigationOptions = ({navigation}) => {
      return {
          header: (<NavigationBar
                    navigation          = {navigation}
                    leftNormalImage     = {require('../../images/home/home_left_icon_transparent.png')}
                    leftHighlightImage  = {require('../../images/home/home_left_icon_normal.png')}
                    rightNormalImage    = {require('../../images/home/home_right_icon_transparent.png')}
                    rightHighlightImage = {require('../../images/home/home_right_icon_normal.png')}
                    normalColor         = {'rgba(255, 255, 255, 0.0)'}
                    highlightColor      = {'rgba(255, 255, 255, 1.0)'}
                  />)
          // headerTitle: '首页 存管版',
          // headerVisible: true,
          // headerLeft: (
          //     <TouchableOpacity 
          //           style = {{justifyContent:'center', alignItems: 'center',marginRight: 7, height:30 ,width: 58}} 
          //            onPress={() => navigation.state.params.onSettingButtonPress()}
          //            >
          //           <Image source = {require('../../images/home/home_left_icon_transparent.png')}/>
          //     </TouchableOpacity>
          // ),
          // headerRight: (
          //     <TouchableOpacity 
          //           style={{justifyContent:'center', alignItems: 'center',marginRight: 7, height:30 ,width: 58}} 
          //            onPress={() => navigation.state.params.onSettingButtonPress()}
          //            >
          //           <Image source = {require('../../images/home/home_right_icon_transparent.png')}/>
          //     </TouchableOpacity>
          // ),
          // headerTintColor : 'white',//文字颜色
          // headerStyle: headerStyle
      }
  }
  componentWillReceiveProps(nextProps){
    console.log(`componentWillReceiveProps ${nextProps}`)
  }
  shouldComponentUpdate(nextProps,nextState){
    console.log(`shouldComponentUpdate nextProps = ${nextProps} nextState =${nextState}`)
    return true
  }
  componentWillUpdate(nextProps,nextState){
    console.log(`componentWillUpdate nextProps = ${nextProps} nextState =${nextState}`)
  }
  componentDidUpdate(nextProps,nextState){
    console.log(`componentDidUpdate nextProps = ${nextProps} nextState =${nextState}`)
  }
  componentWillMount(){
    console.log(`componentWillMount`)
     // const { navigation } = this.props
     //  navigation.navigate('Login')
  }
  componentDidMount(){
    console.log(`componentDidMount`)
     this.loginNotification = DeviceEventEmitter.addListener('GoToLogin', (parms)=>{
        //去登陆
        const { navigation } = this.props
        navigation.navigate('Login')
    });
     this.loginSucessNotification = DeviceEventEmitter.addListener('LoginSuccess', (parms)=>{
        //去登陆
        this.getHomeData(parms)
    });
      this.getHomeData()
  }

  componentWillUnmount(){
    console.log(`componentWillUnmount`)
    this.loginNotification.remove();
    this.loginSucessNotification.remove()
  }

  getHomeData(){
    AsyncStorage.getItem('PJBLoginInfo').then((value) => {
      let jsonValue = JSON.parse((value));
      const {access_token,expires_in,refresh_token,scope,token_type} = jsonValue

       DataRepository.fetchNormalNetRepository('rest/frontPage/v1.7/getBannerIndex',{
        clientId: '4',
      }).then(result => {
          this.convertJSONToModel(result)
      }) 
    })
  }
  convertJSONToModel(result){
    const { bannerMap,mediaReportMap,newComerProduct,recommendMap } = result.result
    for (var i = 0; i < recommendMap.length; i++) {
      var item = recommendMap[i]
      var model = new RecommendModel(item)
    }
  }
  _onScroll(e){
    const {contentInset, contentOffset,contentSize,layoutMeasurement} = e.nativeEvent

    if (contentOffset.y > 100) {
       DeviceEventEmitter.emit('ChangeBarStyle',{isNormal:false});
    }else{
       DeviceEventEmitter.emit('ChangeBarStyle',{isNormal:true});
    }
  }
  _renderHeaderView(){
    return (  <View style = {styles.header}>
                <Image 
                  source = {require('../../images/home/homeplacor1242X882.jpg')} 
                  style = {styles.headerImageBg}
                />
                <View style = {styles.headerAdView}>
                  {
                    [{title: '品牌介绍', subTitle: '专注票据10余年',url: require('../../images/home/home_security_icon.png')},
                     {title: '品牌介绍', subTitle: '专注票据10余年',url: require('../../images/home/home_security_icon.png')},
                     {title: '品牌介绍', subTitle: '专注票据10余年',url: require('../../images/home/home_security_icon.png')}]
                     .map((item,index) =>{
                     return <View key = {index} style = {styles.headerAdItem}>
                              <Image source = {item.url} style = {styles.headerAdItemImage}/>
                              <Text style = {styles.headerAdItemTitle}>{item.title}</Text> 
                              <Text style = {styles.headerAdItemSubTitle}>{item.subTitle}</Text> 
                            </View>
                    })
                  }
                </View>
              </View>
    )
  }
  _renderSingleView(){
    return ( <View>
                <View style = {styles.whiteBg} />
                <View style = {styles.recommond}>
                  <Image style = {styles.recommondImage} source = {require('../../images/home/recommond_btn_bg.png')}>
                    <Text style = {styles.recommondText}>为你推荐</Text>
                  </Image>
                </View>
                <View style = {styles.contentTopView}>
                  <Image style = {styles.contentTopViewImage} source = {require('../../images/home/home_content_head_ppb_icon.png')}/>
                  <Text style = {styles.contentTopViewTextTitle}>票票宝</Text>
                  <View style = {styles.contentTopViewLine}/>
                  <Text style = {styles.contentTopViewTextSubTitle}>定期理财</Text>
                  <View style = {styles.contentTopViewTextBg}>
                    <Text style = {styles.contentTopViewTextTag}>加息券</Text>
                  </View>
                  <View style = {styles.contentTopViewTextBg}>
                    <Text style = {styles.contentTopViewTextTag}>加息券</Text>
                  </View>
                  <View style = {styles.bankIconView}>
                    <Image style = {styles.bankIcon} source = {require('../../images/home/huaxin_cg_bank_icon.png')}/>
                    <Text style = {styles.bankInfoText}>华兴银行存管</Text>
                  </View>
                 
                </View> 
                { this._renderContentView() }
                { this._renderContentView() }
             </View>
    )
  }
  _renderContentView(){
    const {navigation} = this.props
    return <TouchableOpacity style = {styles.contentView} onPress = {()=> navigation.navigate('ChannelManagePage')}>
              <View style = {styles.contentTopLineView}/>
              <View style = {styles.contentPercentView}>
                <Text style = {styles.contentPercentTextBg}>
                  <Text style = {styles.contentPercentText}>6.3%</Text>
                  <Text style = {styles.contentPercentText1}>~8.8%</Text>
                </Text>
                <Text style = {styles.contentPercentTextBg}>
                  <Text style = {styles.contentPercentText}>6.3%</Text>
                  <Text style = {styles.contentPercentText1}>~8.8%</Text>
                </Text>
              </View>
              <View style = {styles.contentCenterLine}/>
              <View style = {styles.contentTipViewBg}>
                <Text style = {styles.contentTipText}>预期年化收益率</Text>
                <Text style = {styles.contentTipText}>期限</Text>
              </View>
           </TouchableOpacity>
  }
  _renderVipView(){

  }

  render() {
    const { navigation } = this.props;
    return (
      <View style = {styles.container}>
        <ScrollView 
        scrollEventThrottle = {10}
        onScroll            = {this._onScroll.bind(this)}
        >
          <View style = {styles.scrollViewContainer}>
          { this._renderHeaderView() }
          { this._renderSingleView() }
          { this._renderSingleView() }
          { this._renderSingleView() }
        </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'rgb(247,247,242)',
  },
  navigationBar:{
    backgroundColor: 'white', 
    height:          64,
    flexDirection:   'row',
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
    color:      '#333333',
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
  scrollViewContainer:{
    // width:           '100%',
    backgroundColor: 'transparent',
  },
  header:{
    // alignItems: 'flex-end',
    height:     882/3.0 + 60
  },
  headerImageBg:{
    position: 'absolute',
  },
  headerAdView:{
    alignSelf:       'flex-end',
    flexDirection:   'row',
    backgroundColor: 'white',
    shadowColor:     '#3a3433',
    shadowOffset:    {width: 0,height: 10},
    shadowRadius:    10,
    shadowOpacity:   0.15,
    marginLeft:      10,
    marginRight:     10,
    marginTop:       200,
    borderRadius:    5,
  },
  headerAdItem:{
    flex:       3,
    alignItems: 'center',
  },
  headerAdItemImage:{
    marginTop: 15,
  },
  headerAdItemTitle:{
    textAlign:    'center',
    marginTop:    10,
    // marginBottom: 10,
    color: '#333333',
    fontSize:     14,
  },
  headerAdItemSubTitle:{
    textAlign:    'center',
    marginTop:    10,
    marginBottom: 10,
    color:        '#666666',
    fontSize:     12,
  },
  whiteBg:{
    position:        'absolute',
    backgroundColor: 'white',
    left:            10,
    right:           10,
    top:             20,
    bottom:          10,
    borderRadius:    5,
    shadowColor:     '#3a3433',
    shadowOffset:    {width: 0,height: 10},
    shadowRadius:    10,
    shadowOpacity:   0.15,
  },
  recommond:{
    marginLeft: 15,
  },
  recommondImage:{
    width:          104,
    height:         48,
    justifyContent: 'center',
    alignItems:     'center',
  },
  recommondText:{
    marginRight:  6,
    marginBottom: 6,
    color:        'white',
  },
  contentTopView:{
    marginLeft:         10,
    marginRight:        10,
    flexDirection:      'row',
    marginTop:          5,
    marginBottom:       20,
    alignItems:         'center',
    alignItems:         'center',
  },
  contentTopViewImage:{
    width:      16,
    height:     16,
    marginLeft: 16,
  },
  contentTopViewTextTitle:{
    marginLeft:      5,
    color: '#333333'
  },
  contentTopViewLine:{
    backgroundColor: 'rgb(241,239,235)',
    marginTop:       2,
    marginLeft:      5,
    marginBottom:    2,
    width:           1,
    height : 10,
  },
  contentTopViewTextSubTitle:{
    marginLeft:      5,
    color: '#666666'
  },
  contentTopViewTextBg:{
    backgroundColor: 'rgb(255,201,158)',
    borderRadius:    3,
    marginLeft:      4,
  },
  contentTopViewTextTag:{
    color:        'white',
    marginLeft:   5,
    marginRight:  5,
    marginTop:    2,
    marginBottom: 2,
  },
  bankIconView:{
    // backgroundColor: 'yellow',
    flexDirection:   'row',
    right:           10,
    position:        'absolute',
  },
  bankInfoText:{
    color: '#baadad'
  },
  bankIcon:{
    marginRight: 2,  
    width:       19,
    height:      16,
  },
  contentTopLineView:{
    backgroundColor: 'rgb(241,239,235)',
    marginLeft:      22,
    marginRight:     22,
    height:          1,
  },
  contentCenterLine:{
    position:        'absolute',
    backgroundColor: 'rgb(241,239,235)',
    width:           1,
    height:          50,
    bottom:          30,
    alignSelf:       'center',
  },
  contentView:{
    // flexDirection: 'row',
    // 
  },
  contentPercentView:{
    flexDirection: 'row',
    marginTop:     20,
  },
  contentPercentTextBg:{
    alignItems:     'center',
    justifyContent: 'center',
    flex:           2,
    textAlign:      'center',
  },
  contentPercentText:{
    color:    '#e94d4e',
    fontSize: 20,
  },
  contentPercentText1:{
    color:    '#e94d4e',
    fontSize: 27,
  },
  contentTipViewBg:{
    marginTop: 5,
    flexDirection: 'row',
    marginBottom : 30,
  },
  contentTipText:{
    flex:      2,
    textAlign: 'center',
    color:     '#6d6261',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
