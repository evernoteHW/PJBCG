
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
} from 'react-native';

import { NavigationActions } from 'react-navigation'
// import Login from '../login'
// import ThemeTopic from '../../common/ThemeTopic'
// import DataRepository from '../../common/netWork'

export const screenWidth = Dimensions.get('window').width
export const screenHeight = Dimensions.get('window').height

const navigateAction = NavigationActions.navigate({
  routeName: 'Setting',
  params:    {},
  action: NavigationActions.navigate({ routeName: 'Setting'})
})

export default class UserInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

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
  render() {
        const { navigate } = this.props.navigation;
        return (
          <View style = {styles.container}>
        
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
 
});
