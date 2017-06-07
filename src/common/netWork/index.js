/**
 * DataRepository
 * 刷新从网络获取;非刷新从本地获取,
 * 若本地数据过期,先返回本地数据,然后返回从网络获取的数据
 * @flow
 */

import {
    AsyncStorage,
    Alert,
    DeviceEventEmitter,
} from 'react-native';

const baseUrl = 'https://www.pj.com'
// var base64 = require('base-64');
// var utf8 = require('utf8');

export default class DataRepository {
    constructor(props) {
        // super(props)
        this.props = props;
    }
    static fetchNetRepository(url,parms={},token=''){

      return new Promise((resolve,reject) => {
      
          var bodyArray = ['referral=App Store']
          for (let property in parms){
            bodyArray.push(`${property}=${parms[property]}`)
          }
          var parmsStr = `${bodyArray.join('&')}`
          var authorization_base64 = `Basic aU9TOnRjTE1MaVRva1dPUUdmRUFHcXJ5`
          var fetch_url = `${baseUrl}/${url}`

          fetch(fetch_url,{
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
    static fetchNormalNetRepository(url,parms={},token=''){
  
      return new Promise((resolve,reject) => {

          AsyncStorage.getItem('PJBLoginInfo').then((value) => {
           let jsonValue = JSON.parse((value));
           const {access_token,expires_in,refresh_token,scope,token_type} = jsonValue

          var bodyArray = ['referral=App Store']
          var authorization_base64 = `${token_type} ${access_token}`
          //获取Toke
          var fetch_url = `${baseUrl}/${url}`

          fetch(fetch_url,{
            method:  "POST",
            headers: {
              'Authorization': authorization_base64,
              'Content-Type':  'application/json',
            },
            body: JSON.stringify(parms),
          }).then((response) => {
            // console.log(response);
            if (response.ok) {
              return response.json()
            }else if (response.status == 401) {
              //去登陆吧
              //Token  过期了
              DeviceEventEmitter.emit('GoToLogin')
            }else{

            }
          }).then((json)=>{
            console.log(json);
            resolve(json)
          }).catch((error) =>{
            reject(error)
        })
          })
          
      }
      )
    }
}
