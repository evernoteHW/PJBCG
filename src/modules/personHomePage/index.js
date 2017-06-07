
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
  ActionSheetIOS,
  ImagePickerIOS,
  ImageStore,
  AlertIOS,
} from 'react-native';

import ImagePicker from 'react-native-image-crop-picker';
import { NavigationActions } from 'react-navigation'
// import Login from '../login'
// import ThemeTopic from '../../common/ThemeTopic'
import DataRepository from '../../common/netWork'

export const screenWidth = Dimensions.get('window').width
export const screenHeight = Dimensions.get('window').height

const navigateAction = NavigationActions.navigate({
  routeName: 'Setting',
  params:    {},
  action: NavigationActions.navigate({ routeName: 'Setting'})
})

export default class PersonHomePage extends Component {
  constructor(props) {
    super(props);
    let userData = props.navigation.state.params.userData;
    this.state = {
      username:     userData.username,
      personalHead: userData.personalHead,
      realName:     userData.realName,
      idNo:         userData.idNo,
      mobilePhone:  userData.mobilePhone,
    }
  }
  static navigationOptions = ({navigation}) => {
      return {
        headerTitle:     '设置',
        headerTintColor: '#333333',//文字颜色
        headerStyle:     {backgroundColor: 'white',},
        headerLeft:      (
          <TouchableOpacity 
              style   = {{width: 65,height: 44, justifyContent: 'center',backgroundColor: 'transparent'}}
              onPress = {()=> navigation.goBack()}
          >
            <Image 
              source = {require('../../images/common/common_return_btn_black.png')}
              style = {{marginLeft:10, width: 20, height:20,backgroundColor: 'transparent'}}
            />
          </TouchableOpacity>
        )
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
    // AsyncStorage.getItem('PJBLoginInfo').then((value) => {
    //   let jsonValue = JSON.parse((value));
    //   const {access_token,expires_in,refresh_token,scope,token_type} = jsonValue
    //   console.log(`access_token = ${access_token} expires_in = ${expires_in} refresh_token = ${refresh_token} scope = ${scope} token_type=${token_type}`);
    //    DataRepository.fetchNormalNetRepository('rest/userHome/v1.4/homeInit',{
    //   },`${token_type} ${access_token}`).then(data => {
    //       this.setState({userData: data.result})
    //   }) 
    // })
  }
   showActionSheet() {
    ActionSheetIOS.showActionSheetWithOptions({
      options: ['拍照','相册','取消'],
      cancelButtonIndex: 2,
      // destructiveButtonIndex: '3333',
    },
    (buttonIndex) => {
        switch(buttonIndex){
          case 0: 
            this.openCamera();
          break
          case 1: 
            this.openPicker();
          break
        } 
    });
  }
  openCamera(){
    // ImagePickerIOS.openCameraDialog({},imageUrl =>{
    //   this.uploadAvatar(imageUrl)
    // },error =>{
    //   console.log(error)
    // })
    ImagePicker.openCamera({
      width:         80,
      height:        80,
      includeBase64: true,
    }).then(image => {
      console.log(image)
    });
  }
  openPicker(){
    ImagePicker.openPicker({
      width:         80,
      height:        80,
      includeBase64: true,
      compressImageQuality: 0.01,
    }).then(image => {
      this.scareImage(image)
    });
    // ImagePickerIOS.openSelectDialog({},imageUrl =>{
      
    // },error =>{
    //   console.log(error)
    // })
  }
  scareImage(image){
      ImagePicker.openCropper({
        path: image.path,
        width: 80,
        height: 80,
        includeBase64: true,
      }).then(image => {
        this.uploadAvatar(image)
      });
  }
  //头像上传
  uploadAvatar(image){

      DataRepository.fetchNormalNetRepository('rest/upload/v1/uploadAvatar',{
        fileName: 'head.jpg',
        imgStr: image.data,
      }).then(data => {
          this.setState({personalHead: `https://www.pj.com/img/${data.result.personalHead}`})
      }) 
  }
  //拍照
  render() {
        const { navigate } = this.props.navigation;
        return (
          <View style = {styles.container}>
              <ScrollView>
                <View>
                  <View style = {{marginLeft: 10, marginRight: 10, marginTop: 15, borderRadius: 5, borderColor: 'gray',borderWidth: 0.5}}>
                      <TouchableOpacity 
                          style = {{flexDirection: 'row',alignItems: 'center',marginTop: 5,marginBottom: 5}}
                          onPress = {() => this.showActionSheet()}
                      >
                          <Text style = {{marginLeft: 10,flex: 1}}> 头像</Text>
                          <Image source = {{url: this.state.personalHead}} style = {{width : 30,height: 30, borderRadius:15,marginRight: 10}}/>
                      </TouchableOpacity>
                      <View  style = {{backgroundColor: 'gray',flex: 1,height: 0.5}}/>
                      <TouchableOpacity 
                          style = {{flexDirection: 'row',alignItems: 'center',height: 40}}
                          onPress = {()=>{
                            AlertIOS.prompt('修改用户名', null, value =>{
                                this.setState({username: value})
                            },'plain-text', this.state.username)

                            // AlertIOS.prompt(
                            //     '标题',
                            //     '内容',
                            //     (value:string)=>{
                            //         console.log(value);
                            //     },
                            //     'plain-text',
                            //     'default-string'
                            // )
                          }}
                      >
                          <Text style = {{marginLeft: 10,flex: 1}}> 用户名</Text>
                          <Text style = {{marginRight: 10}}>{this.state.username}</Text>
                      </TouchableOpacity>
                  </View>
                  <View style = {{marginLeft: 10, marginRight: 10, marginTop: 15, borderRadius: 5, borderColor: 'gray',borderWidth: 0.5}}>
                        <View style = {{flexDirection: 'row',alignItems: 'center',height: 40}}>
                            <Text style = {{marginLeft: 10,flex: 1}}> 姓名</Text>
                            <Text style = {{marginRight: 10}}>{this.state.realName}</Text>
                        </View>
                        <View  style = {{backgroundColor: 'gray',flex: 1,height: 0.5}}/>
                        <View style = {{flexDirection: 'row',alignItems: 'center',height: 40}}>
                            <Text style = {{marginLeft: 10,flex: 1}}> 用户名</Text>
                            <Text style = {{marginRight: 10}}>{this.state.idNo}</Text>
                        </View>
                        <View  style = {{backgroundColor: 'gray',flex: 1,height: 0.5}}/>
                        <View style = {{flexDirection: 'row',alignItems: 'center',height: 40}}>
                            <Text style = {{marginLeft: 10,flex: 1}}> 绑定手机</Text>
                            <Text style = {{marginRight: 10}}>{this.state.mobilePhone}</Text>
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
    backgroundColor: 'white',
  },
 
});
