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
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';

import VideoRootViewPage from './VideoRootViewPage'
import DataRepository from '../../common/netWork'

export default class Finance extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      investProductMap: [],
    };
  }
  static navigationOptions = ({navigation}) => {
      return {
          headerTitle: '理财',
          headerVisible: true,
          headerRight: (
              <TouchableOpacity 
                    style={{justifyContent:'center', alignItems: 'center',marginRight: 7, height:30 ,width: 58}} 
                     onPress={() => navigation.state.params.onSettingButtonPress()}
                     >
                    <Text style={{fontSize:16, color:"rgb(253,169,70)"}}>登录</Text>
              </TouchableOpacity>
          ),
          headerTintColor : '#333333',//文字颜色
          headerStyle: {backgroundColor: 'white'}
      }
  }

  componentWillMount(){

  }
  componentDidMount(){
    DataRepository.fetchNormalNetRepository('rest/frontPage/v1.2/getFinance',{
      clientId: '4',
      imei:     '1111',
    }).then(data => {
        this.convertJSONToModel(data)
    })      
  }
  convertJSONToModel(data){
    // investProductMap
    this.setState({investProductMap: data.result.investProductMap})
  }
  _onScroll(e){
   
  }
  _renderHeaderView(){
    return (  <View style = {styles.header}>
                <Image source = {require('../../images/home/homeplacor1242X882.jpg')} style = {styles.headerImageBg}/>
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
  _renderSingleView(item,index){
    return ( <View key = {index}>
                <View style = {styles.whiteBg} />
                  <View style = {styles.contentTopView}>
                    <Image style = {styles.contentTopViewImage} source = {require('../../images/home/home_content_head_ppb_icon.png')}/>
                    <Text style = {styles.contentTopViewTextTitle}>{item.productName}</Text>
                    <View style = {styles.contentTopViewLine}/>
                    <Text style = {styles.contentTopViewTextSubTitle}>{item.productTypeName}</Text>
                    {
                      (item.tag1 != undefined && item.tag1.length>0) ?  <View style = {styles.contentTopViewTextBg}>
                          <Text style = {styles.contentTopViewTextTag}>{item.tag1}</Text>
                        </View> : null
                    }
                    {
                    (item.tag2 != undefined && item.tag2.length>0) ? <View style = {styles.contentTopViewTextBg}>
                      <Text style = {styles.contentTopViewTextTag}>{item.tag2}</Text>
                    </View>: null
                    } 
                    <View style = {styles.bankIconView}>
                      <Image style = {styles.bankIcon} source = {require('../../images/home/huaxin_cg_bank_icon.png')}/>
                      <Text style = {styles.bankInfoText}>华兴银行存管</Text>
                    </View>
                   
                  </View> 
                  { this._renderContentView(item) }
             </View>
    )
  }
  _renderContentView(item){
    switch(item.productTypeId){
      case "5":{
        return this._renderNewUser(item)
      }
      case "1":{
        return this._renderTTB(item)
      }
      case "2":{
        return this._renderTTBAdd(item)
      }
      case "3":{
        return this._renderPPB(item)
      }
      case "7":{
        return this._renderWZB(item)
      }
      default: 
        return this._renderProductView(1,2,3)
      break 
    }
  }
  _renderNewUser(item){
    var list = []
    for (var i = 0; i < item.productItem.length; i++) {
        var subItem = item.productItem[i]
        let leftStr = `${subItem.yearProfit}%`
        let centerStr = `${subItem.deadline}天`
        let rightStr = `${subItem.yearProfit}%`
        list.push(this._renderProductView(leftStr,centerStr,rightStr,i))
    }
    return list
  }
  _renderTTB(item){
    let leftStr = `${item.productAnnualRate}%`
    let centerStr = `随存随取`
    let rightStr = `''`
    return this._renderProductView(leftStr,centerStr,rightStr)
  }
  _renderTTBAdd(item){
    let leftStr = `${item.productAnnualRate}%`
    let centerStr = `${item.lockUpPeriodDesc}锁定期后`
    let rightStr = `''`
    return this._renderProductView(leftStr,centerStr,rightStr)
  }
  _renderPPB(item){
    var list = []
    for (var i = 0; i < item.productItem.length; i++) {
        var subItem = item.productItem[i]
        let leftStr = `${subItem.yearProfit}%`
        let centerStr = `${subItem.deadline}天`
        let rightStr = `${subItem.yearProfit}%`
        list.push(this._renderProductView(leftStr,centerStr,rightStr,i))
    }
    return list
  }
  _renderWZB(item){
    let leftStr = `${item.minAnnualRate}%~${item.maxAnnualRate}%`
    let centerStr = `${item.deadlineMin}~${item.deadlineMax}天`
    let rightStr = `''`
    return this._renderProductView(leftStr,centerStr,rightStr)
  }
  _renderProductView(leftStr,centerStr,rightStr,key){
   const {navigation} = this.props
   return <TouchableOpacity style = {styles.contentView} onPress = {()=> navigation.navigate('ChannelManagePage')} key = {key}>
                <View style = {styles.contentTopLineView}/>
                    <View style = {styles.contentPercentView}>
                      <View style = {{flex: 3,justifyContent: 'center',alignItems: 'center'}}>
                          <Text style = {styles.contentPercentText}>{leftStr}</Text>
                          <Text style = {styles.contentTipText}>预期年化收益率</Text>
                      </View>
                      <View style = {styles.contentCenterLine}/>
                      <View style = {{flex: 3,justifyContent: 'center',alignItems: 'center'}}>
                          <Text style = {styles.contentPercentText}>{centerStr}</Text>
                          <Text style = {styles.contentTipText}>期限</Text>
                      </View>
                      <View style = {styles.contentCenterLine}/>
                      <View style = {{flex: 3,justifyContent: 'center',alignItems: 'center'}}>
                        <TouchableOpacity>
                          <Image style = {styles.recommondImage} source = {require('../../images/home/recommond_btn_bg.png')}>
                            <Text style = {styles.recommondText}>为你推荐</Text>
                          </Image>
                        </TouchableOpacity>    
                      </View>
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
          {
            this.state.investProductMap.map((item,index) =>{
              return this._renderSingleView(item,index)
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
    top:             10,
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
    marginLeft:    10,
    marginRight:   10,
    flexDirection: 'row',
    marginTop:     30,
    marginBottom:  20,
    alignItems:    'center',
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
    // position:        'absolute',
    backgroundColor: 'rgb(241,239,235)',
    width:           0.5,
    height:          50,
    // bottom:          30,
    // alignSelf:       'center',
  },
  contentView:{
    // flexDirection: 'row',
  },
  contentPercentView:{
    flexDirection: 'row',
    marginTop:     15,
    marginLeft:    10,
    marginRight:   10,
    marginBottom:  25,
  },
  contentPercentTextBg:{
    alignItems:     'center',
    justifyContent: 'center',
    flex:           3,
    textAlign:      'center',
  },
  contentPercentText:{
    color:        '#e94d4e',
    fontSize:     20,
    marginBottom: 10,
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
    flex:      3,
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
});
