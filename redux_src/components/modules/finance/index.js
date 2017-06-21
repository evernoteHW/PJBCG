/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';

import styles from './styles'

import DataRepository from '../../../common/netWork'

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
                     onPress={() => {
                         navigation.navigate('Login')
                     }}
                     >
                    <Text style={{fontSize:16, color:"rgb(253,169,70)"}}>登录</Text>
              </TouchableOpacity>
          ),
          headerTintColor : '#333333',//文字颜色
          headerStyle: {backgroundColor: 'white'},
          tabBarLabel: '理财',
          tabBarIcon:  ({focused,tintColor}) =>  
              <Image 
                source = {focused ? require('../../../resources/images/tab/scr_root_finance_selected.png'): require('../../../resources/images/tab/scr_root_finance_normal.png')}
                style  = {{height:20 ,width: 20}}
              />,
      }
  }

  componentWillMount(){

  }
  componentDidMount(){
    const { financeActions } = this.props
    financeActions.updateFinanceData()
    
  }

  _onScroll(e){
   
  }
  
  _renderSingleView(item,index){
    return ( <View key = {index}>
                <View style = {styles.whiteBg} />
                  <View style = {styles.contentTopView}>
                    <Image style = {styles.contentTopViewImage} source = {require('../../../resources/images/home/home_content_head_ppb_icon.png')}/>
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
                      <Image style = {styles.bankIcon} source = {require('../../../resources/images/home/huaxin_cg_bank_icon.png')}/>
                      <Text style = {styles.bankInfoText}>商业汇票</Text>
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
                          <Text style = {styles.contentPercentText1}>{centerStr}</Text>
                          <Text style = {styles.contentTipText}>期限</Text>
                      </View>
                      <View style = {styles.contentCenterLine}/>
                      <View style = {{flex: 3,justifyContent: 'center',alignItems: 'center'}}>
                        <TouchableOpacity>
                          <Image style = {styles.recommondImage} source = {require('../../../resources/images/home/recommond_btn_bg.png')}>
                            <Text style = {styles.recommondText}>为你推荐</Text>
                          </Image>
                        </TouchableOpacity>    
                      </View>
                   </View>
          </TouchableOpacity>
  }

  render() {
    const { navigation,fetchResult } = this.props;

    return (
      <View style = {styles.container}>
        <StatusBar barStyle="default" />
        <ScrollView 
        scrollEventThrottle = {10}
        onScroll            = {this._onScroll.bind(this)}
        >
          <View style = {styles.scrollViewContainer}>
          {
            fetchResult.investProductMap.map((item,index) =>{
              return this._renderSingleView(item,index)
            })
          }
        </View>
        </ScrollView>
      </View>
    );
  }
}

