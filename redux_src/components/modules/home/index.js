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

import styles from './styles'

// export const screenWidth = Dimensions.get('window').width
// export const screenHeight = Dimensions.get('window').height

// import NavigationBar from '../../common/NavigationBar'
// import RootViewPage from './RootViewPage'
// import DataRepository from '../../common/netWork'
// import RecommendModel from '../../models/RecommendModel'


// import { NavigationActions } from 'react-navigation'

// const navigateAction = NavigationActions.navigate({
//   routeName: 'Setting',
//   params:    {},
//   action: NavigationActions.navigate({ routeName: 'Setting'})
// })


export default class Home extends Component {
  // constructor(props) {
  //   super(props);
  //   // props.navigation.setParams({isNormal: false})
  //   this.state = {
  //     bannerMap:       [],
  //     mediaReportMap:  [],
  //     newComerProduct: [],
  //     recommendMap:    [],
  //   };
  // }

  static navigationOptions = ({navigation}) => {
      return {
          header: null,
          // title:       '首页',
          // headerStyle: {backgroundColor: 'white'},               
          tabBarLabel: '首页',
          tabBarIcon:  ({focused,tintColor}) =>  
              <Image 
                source = {focused ? require('../../../resources/images/tab/scr_root_home_selected.png'): require('../../../resources/images/tab/scr_root_home_normal.png')}
                style  = {{height:20 ,width: 20}}
              />,
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
  // // componentWillReceiveProps(nextProps){
  // //   console.log(`componentWillReceiveProps ${nextProps}`)
  // // }
  // // shouldComponentUpdate(nextProps,nextState){
  // //   console.log(`shouldComponentUpdate nextProps = ${nextProps} nextState =${nextState}`)
  // //   return true
  // // }
  // // componentWillUpdate(nextProps,nextState){
  // //   console.log(`componentWillUpdate nextProps = ${nextProps} nextState =${nextState}`)
  // // }
  // // componentDidUpdate(nextProps,nextState){
  // //   console.log(`componentDidUpdate nextProps = ${nextProps} nextState =${nextState}`)
  // // }
  // // componentWillMount(){

  // //   console.log(`componentWillMount`)
  // //    // const { navigation } = this.props
  // //    //  navigation.navigate('Login')
  // // }
  componentDidMount(){
     // const { navigation } = this.props
     //  navigation.navigate('Login')
    //  this.loginNotification = DeviceEventEmitter.addListener('GoToLogin', (parms)=>{
    //     //去登陆
    //     const { navigation } = this.props
    //     navigation.navigate('Login')
    // });
    //  this.loginSucessNotification = DeviceEventEmitter.addListener('LoginSuccess', (parms)=>{
    //     //去登陆
    //     this.getHomeData(parms)
    // });
    const { homeActions } = this.props;
    homeActions.updateHomeData()
  }

  // componentWillUnmount(){
  //   console.log(`componentWillUnmount`)
  //   this.loginNotification.remove();
  //   this.loginSucessNotification.remove()
  // }

  getHomeData(){

       DataRepository.fetchNormalNetRepository('rest/frontPage/v1.7/getBannerIndex',{
        clientId: '4',
      }).then(result => {
          this.convertJSONToModel(result)
      }) 


  }
  // convertJSONToModel(result){
  //   const { bannerMap,mediaReportMap,newComerProduct,recommendMap } = result.result

  //   var recommendMapTemp = []
  //   for (var i = 0; i < recommendMap.length; i++) {
  //     var item = recommendMap[i]
  //     var model = new RecommendModel(item)
  //     recommendMapTemp.push(model)
  //   }
  //   this.setState({recommendMap: recommendMapTemp})
  // }
  // _onScroll(e){
  //   const {contentInset, contentOffset,contentSize,layoutMeasurement} = e.nativeEvent

  //   if (contentOffset.y > 100) {
  //      DeviceEventEmitter.emit('ChangeBarStyle',{isNormal:false});
  //   }else{
  //      DeviceEventEmitter.emit('ChangeBarStyle',{isNormal:true});
  //   }
  // }
  _renderHeaderView(){
    return (  <View style = {styles.header}>
                <Image 
                  source = {require('../../../resources/images/home/homeplacor1242X882.jpg')} 
                  style = {styles.headerImageBg}
                />
                <View style = {styles.headerAdView}>
                  {
                    [{title: '品牌介绍', subTitle: '专注票据10余年',url: require('../../../resources/images/home/home_security_icon.png')},
                     {title: '品牌介绍', subTitle: '专注票据10余年',url: require('../../../resources/images/home/home_security_icon.png')},
                     {title: '品牌介绍', subTitle: '专注票据10余年',url: require('../../../resources/images/home/home_security_icon.png')}]
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
  _renderSingleView(model,index){
    if (model == undefined) {
      return null
    }
    return ( <View key = {index}>
                <View style = {styles.whiteBg} />
                <View style = {styles.recommond}>
                  <Image style = {styles.recommondImage} source = {require('../../../resources/images/home/recommond_btn_bg.png')}>
                    <Text style = {styles.recommondText}>为你推荐</Text>
                  </Image>
                </View>
                <View style = {styles.contentTopView}>
                  <Image style = {styles.contentTopViewImage} source = {require('../../../resources/images/home/home_content_head_ppb_icon.png')}/>
                  <Text style = {styles.contentTopViewTextTitle}>{model.productName}</Text>
                  <View style = {styles.contentTopViewLine}/>
                  <Text style = {styles.contentTopViewTextSubTitle}>{model.productTypeName}</Text>
                  {
                    (model.tag1 != undefined) ? <View style = {styles.contentTopViewTextBg}>
                        <Text style = {styles.contentTopViewTextTag}>{model.tag1}</Text>
                      </View> : null
                  }
                  {
                    (model.tag2 != undefined) ? <View style = {styles.contentTopViewTextBg}>
                      <Text style = {styles.contentTopViewTextTag}>{model.tag2}</Text>
                    </View> : null
                  }
                  <View style = {styles.bankIconView}>
                    <Image style = {styles.bankIcon} source = {require('../../../resources/images/home/huaxin_cg_bank_icon.png')}/>
                    <Text style = {styles.bankInfoText}>华兴银行存管</Text>
                  </View>
                 
                </View> 
                { this._renderContentView(model) }
             </View>
    )
  }
  _renderContentView(model){
    const {navigation} = this.props
    return <TouchableOpacity style = {styles.contentView} onPress = {()=> navigation.navigate('ChannelManagePage')}>
              <View style = {styles.contentTopLineView}/>
              <View style = {styles.contentPercentView}>
                <Text style = {styles.contentPercentTextBg}>
                  <Text style = {styles.contentPercentText}>{model.productAnnualRate}</Text>
                </Text>
                { model.productTypeId == '1' ? this._renderTTB(model) : null }
                { model.productTypeId == '2' ? this._renderTTBPlus(model) : null }
                { model.productTypeId == '3' ? this._renderPPB(model) : null }
                { model.productTypeId == '4' ? this._renderVip(model) : null }
              </View>
              <View style = {styles.contentCenterLine}/>
              <View style = {styles.contentTipViewBg}>
                <Text style = {styles.contentTipText}>预期年化收益率</Text>
                <Text style = {styles.contentTipText}>期限</Text>
              </View>
           </TouchableOpacity>
  }
  _renderTTB(model){
  return <Text style = {styles.contentPercentTextBg}>
            <Text style = {styles.contentPercentText}>随存随取</Text>
        </Text>
  }
  _renderTTBPlus(model){
   return <Text style = {styles.contentPercentTextBg}>
              <Text style = {styles.contentPercentText}>{model.lockUpPeriodDesc}</Text>
              <Text style = {styles.contentPercentText1}>灵活提现</Text>
          </Text>
  }
  _renderPPB(model){
   return <Text style = {styles.contentPercentTextBg}>
              <Text style = {styles.contentPercentText}>{model.deadlineMin}</Text>
              <Text style = {styles.contentPercentText1}>~{model.deadlineMax}天</Text>
          </Text>
  }
  _renderVip(model){
   return <Text style = {styles.contentPercentTextBg}>
              <Text style = {styles.contentPercentText}>注册会员专享</Text>
              <Text style = {styles.contentPercentText1}>{model.activityTime}</Text>
          </Text>
  }

  render() {
    const { navigation,fetchResult,dispatch } = this.props;
    const { bannerMap,mediaReportMap,recommendMap } = fetchResult
    return (
      <View style = {styles.container}>
      {
        fetchResult.isFetching ? <Text>正在加载</Text> : null
      }
     {
          <ScrollView 
          scrollEventThrottle = {10}
          // onScroll            = {this._onScroll.bind(this)}
          >
            <View style = {styles.scrollViewContainer}>
              { this._renderHeaderView() }
              {
                  recommendMap.map((item,index) =>{
                    return this._renderSingleView(item,index)
                  }) 
              }
            </View>
          </ScrollView>
        }

      </View>
    );
  }
}


