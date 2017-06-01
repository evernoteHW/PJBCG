/**
 * DataRepository
 * 刷新从网络获取;非刷新从本地获取,
 * 若本地数据过期,先返回本地数据,然后返回从网络获取的数据
 * @flow
 */

import {
    AsyncStorage,
    Alert,
} from 'react-native';

// var base64 = require('base-64');
// var utf8 = require('utf8');

export default class DataRepository {
    constructor(props) {
        // super(props)
        this.props = props;
    }
    static fetchNetRepository(url,parms={},isLogin=false){

      return new Promise((resolve,reject) => {
      
          var bodyArray = ['referral=App Store']
          for (let property in parms){
            bodyArray.push(`${property}=${parms[property]}`)
          }
          var parmsStr = `${bodyArray.join('&')}`
          var authorization_base64 = ''
          if (isLogin) {
            // var bytes = utf8.encode("iOS:tcLMLiTokWOQGfEAGqry");
            // var encoded = base64.encode(bytes);
            authorization_base64 = `Basic aU9TOnRjTE1MaVRva1dPUUdmRUFHcXJ5`
          }else{
            // authorization_base64 = `Basic ${Base64(authorization)}`
          }

          fetch(url,{
            method:  "POST",
            headers: {
              'Authorization': authorization_base64,
              'Content-Type':  'application/x-www-form-urlencoded',
            },
            body: parmsStr,
          }).then((response) => {
            if (response.ok) {
              return response.json()
            }else if (response.status == 401) {
              Alert.alert("Oops! You are not authorized.");
            }else{
              Alert.alert(`${response.status}`);
            }
          }).then((json)=>{
            console.log(json);
            resolve(json)
          }).catch((error) =>{
            reject(error)
        })
      }
      )
    }
}