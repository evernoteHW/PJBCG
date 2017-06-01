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
  WebView,
  Dimensions,
  TouchableOpacity,
  TextInput,
  DeviceEventEmitter,
  Alert,
  ScrollView,
  Image,
} from 'react-native';

export const screenWidth = Dimensions.get('window').width

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
    DeviceEventEmitter.emit('LoginSuccess',{info:'你成功了'});
  }
  render() {
    return (
      <ScrollView>
      <View style = {styles.container}>
          <Image style = {styles.headerBg} source = {require('../../images/login/login_bannerNew.jpg')} />
          <View style = {styles.header}>
            <TouchableOpacity  style = {styles.leftCancelBg} onPress = {this._cancel}>
              <Text style = {styles.cancel}>  取消</Text>
            </TouchableOpacity>
            <View style = {styles.headTitle}>
              <Text style = {styles.title}>登录</Text>
            </View>
          </View>
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
    );
  }
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
  },
  leftCancelBg:{
    justifyContent:  'center',
    // alignItems:      'center',
    position:        'absolute',
    width:           60,
    height:          30,
    left:            7,
    top:             27,
    // backgroundColor: 'orange',
  },
  cancel:{
    // textAlign:       'center',
    color:           '#1296db',
    backgroundColor: 'transparent',
  },
  title:{
    color:           '#333333',
    fontSize:        16,
    backgroundColor: 'transparent',
  },
  headTitle:{
    alignItems:      'center',
    justifyContent:  'center',
    position:        'absolute',
    left:            60,
    right:           60,
    top:             20,
    height:          44,
    // backgroundColor: 'orange'
  },
  header:{
    backgroundColor: 'white',
  },
  headerBg:{
    width: screenWidth,
    height: screenWidth*(32.0/75.0),
  },
  separator:{
    height: 0.5,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'rgb(242,242,242)',
  },
  input:{
    marginLeft: 10,
    height:     40,
    color:      '#333333',
    fontSize:   14,
    padding:    0,
  },
  inputBg:{
    backgroundColor: 'white',
    marginTop:          84,
    borderRadius: 3,
    // borderWidth: 1,
    marginLeft:   10,
    marginRight:  10,
  },
  loginText:{
    color:    'white',
    fontSize: 15,
  },
  loginBtn:{
    marginTop:             10,
    justifyContent:  'center',
    alignItems:      'center',
    backgroundColor: 'rgb(208,16,44)',
    borderRadius:    3,
    height:          40,
    marginLeft:      10,
    marginRight:     10,

    // [btn setBackgroundImage:[ViewUtility imageWithColor:[UIColor colorWithRed:213/255.0 green:54/255.0 blue:58/255.0 alpha:1.0]] forState:UIControlStateHighlighted];
  },
  forgetPwd:{
    color:      'rgb(51,153,255)',
    marginLeft: 10,
    marginTop:  13,
  },
  bottom:{
    flex:            1, 
    backgroundColor: 'orange', 
    justifyContent:  'flex-end',
    alignItems:      'center'
  },
  register:{
    marginTop:    10,
    borderWidth:  0.5,
    borderRadius: 3,
    borderColor:  'gray',
    width:        100,
  },
  registerText:{
    color:        'rgb(208,16,44)',
    textAlign:    'center',
    marginTop:    10,
    marginBottom: 10,
  },
  phoneNumber:{
    marginBottom:             20,
    justifyContent:  'center',
    alignItems:      'center',
    borderRadius:    3,
    height:          40,
  },
  phoneNumberText:{
      color:      'rgb(51,153,255)',
  },
});

