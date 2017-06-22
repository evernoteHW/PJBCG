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
  WebView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  DeviceEventEmitter,
  Alert,
  ScrollView,
  Image,
  AsyncStorage,
} from 'react-native';

import DataRepository from '../../../common/netWork'
import styles from './styles'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData:   [],
      refreshing: false,
      userName:   '',
      pwd:        '',
    };
  }

  componentDidMount(){
      //注册通知
     
  }

  _cancel = () => {
    if(this.props.cancel){
      this.props.cancel()
    }
  }
  _login = () => {
    const { navigation } = this.props
    if (!(this.state.userName.length > 0)) {
      Alert.alert('用户名不能为空')
      return
    }
    if (!(this.state.pwd.length > 0)) {
      Alert.alert('密码不能为空')
      return
    }
    if (this.props.login) {
      this.props.login()
    }
    const { loginActions } = this.props
    loginActions.userLoginIn('oauth/token',{
      device_token: 'fd970f02a47dfd26d73a1f5649d573fe4c6667bce8f4a422359a1e08296d9f0d',
      grant_type: 'password',
      password: this.state.pwd,
      username: this.state.userName,
    }) 
  }
  componentWillReceiveProps(nextProps){
    if (nextProps.loginReducer.loginSuccess) {
       const { navigation } = this.props
       const { homeActions,financeActions,mineActions} = nextProps
       navigation.goBack()
       AsyncStorage.setItem('PJBLoginInfo',JSON.stringify(nextProps.loginReducer.result),()=>{
          //更新 首页 理财 和设置页面
          homeActions.updateHomeData()
          financeActions.updateFinanceData()
          mineActions.updateMineData()
       })
    }
  }
  render() {
    const { navigation } = this.props
    return (
      <View style = {styles.container}>
        <ScrollView style = {styles.scrollView}>
        <View style = {styles.container}>
            <Image style = {styles.headerBg} source = {require('../../../resources/images/login/login_bannerNew.jpg')} >
             <TouchableOpacity style = {styles.back} onPress = {()=> navigation.goBack()}>
              <Image source = {require('../../../resources/images/common/common_return_btn.png')} style = {styles.backImage}/>
              </TouchableOpacity>
            </Image>
            <View style = {styles.inputBg}>
              <TextInput 
                style                 = {styles.input} 
                placeholder           = {'手机号/用户/邮箱'}
                underlineColorAndroid = "transparent"
                autoFocus             = {true}
                keyboardType          = {'numeric'}
                maxLength             = {20}
                onChangeText          = {(userName) => this.setState({userName})}
                clearButtonMode       = {'while-editing'}
              />
              <View style = {styles.separator}/>
              <TextInput 
                style                 = {styles.input} 
                placeholder           = {'请输入密码'}
                underlineColorAndroid = "transparent"
                autoFocus             = {false}
                secureTextEntry       = {true}
                onChangeText          = {(pwd) => this.setState({pwd})}
              />
              <View style = {styles.separator}/>
            </View>
            <TouchableOpacity style = {styles.loginBtn} onPress = {this._login}>
                <Text style = {styles.loginText}>登录</Text>
            </TouchableOpacity>
            <Text style = {styles.forgetPwd} onPress = {()=>{
              console.log('....');
            }}>忘记密码?</Text>
            <View style = {styles.bottom}>
              <TouchableOpacity style = {styles.register} onPress = {this._login}>
                  <Text style = {styles.registerText}>注册</Text>
              </TouchableOpacity>
              <TouchableOpacity style = {styles.phoneNumber} onPress = {this._login}>
                  <Text style = {styles.phoneNumberText}>客服电话：400-188-9138</Text>
              </TouchableOpacity>
            </View>
        </View>
        </ScrollView>
      </View>
    );
  }
 }


