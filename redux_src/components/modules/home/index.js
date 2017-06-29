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
// import ViewPager from 'react-native-viewpager';
import ViewPager from '../../../common/ViewPager';

var IMGS = [
  'https://images.unsplash.com/photo-1441742917377-57f78ee0e582?h=1024',
  'https://images.unsplash.com/photo-1441716844725-09cedc13a4e7?h=1024',
  'https://images.unsplash.com/photo-1441448770220-76743f9e6af6?h=1024',
  'https://images.unsplash.com/photo-1441260038675-7329ab4cc264?h=1024',
  'https://images.unsplash.com/photo-1441126270775-739547c8680c?h=1024',
  'https://images.unsplash.com/photo-1440964829947-ca3277bd37f8?h=1024',
  'https://images.unsplash.com/photo-1440847899694-90043f91c7f9?h=1024'
];

export default class Home extends Component {

  static navigationOptions = ({navigation}) => {
      return {
          header: null,
          tabBarLabel: '首页',
          tabBarIcon:  ({focused,tintColor}) =>  
              <Image 
                source = {focused ? require('../../../resources/images/tab/scr_root_home_selected.png'): require('../../../resources/images/tab/scr_root_home_normal.png')}
                style  = {{height:20 ,width: 20}}
              />,
      }
  }
  constructor(props) {
    super(props);
  
    var dataSource = new ViewPager.DataSource({ pageHasChanged: (p1, p2) => p1 !== p2});
    this.state = {
      dataSource: dataSource.cloneWithPages(IMGS),
    } 
  }

  componentDidMount(){
    const { homeActions } = this.props;
    homeActions.updateHomeData()

    // this.props.navigation.navigate('Login')
  }
  _renderPage(data,pageID){
    return (
      <Image
        // source = {{url: data}}
        source = {require('../../../resources/images/home/homeplacor1242X882.jpg')} 
        // style  = {styles.headerImageBg} 
       />
    )
  }
  _renderHeaderView(){
    return (  <View style = {styles.header}>
                {
                  <View style  = {styles.headerImageBg}>
                      {
                        // <ViewPager
                        //         style      = {styles.headerImageBg}
                        //         dataSource = {this.state.dataSource}
                        //         renderPage = {this._renderPage}
                        //         isLoop     = {true}
                        //         autoPlay   = {true}
                        // />
                        this._renderPage()
                      }
                  </View>    
                }
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
    const { navigation,onClick,homeActions } = this.props
    return <TouchableOpacity style = {styles.contentView} onPress = {()=> {
                // navigation.navigate('ChannelManagePage')
                // onClick()
                  homeActions.pushLogin()
                }
              }
            >
              <View style = {styles.contentTopLineView}/>
              <View style = {styles.contentPercentView}>
                <View style = {styles.contentPercentTextBg}>
                  <Text style = {styles.contentPercentText}>{model.productAnnualRate}</Text>
                </View>
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
  return <View style = {styles.contentPercentTextBg}>
            <Text style = {styles.contentPercentText1}>随存随取</Text>
         </View>
  }
  _renderTTBPlus(model){
   return <View style = {[styles.contentPercentTextBg,{flexDirection: 'column'}]}>
              <Text style = {[styles.contentPercentText1,{marginBottom: 5}]}></Text>
              <Text style = {styles.contentPercentText1}>灵活提现</Text>
          </View>
  }
  _renderPPB(model){
   return <View style = {styles.contentPercentTextBg}>
              <Text style = {styles.contentPercentText1}>{model.deadlineMin}~{model.deadlineMax}天</Text>
          </View>
  }
  _renderVip(model){
   return <View style = {styles.contentPercentTextBg}>
              <Text style = {[styles.contentPercentText1,{marginBottom: 5}]}>注册会员专享</Text>
              <Text style = {styles.contentPercentText1}>{model.activityTime}</Text>
          </View>
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


