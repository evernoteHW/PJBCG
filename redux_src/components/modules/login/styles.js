import { StyleSheet,Dimensions } from 'react-native';
export const screenWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
  },
  scrollView:{
    backgroundColor: 'white',
  },
  back:{
    justifyContent:  'center',
    // alignItems:      'center',
    position:        'absolute',
    width:           65,
    height:          44,
    left:            0,
    top:             20,
    // backgroundColor: 'orange',
  },
  backImage:{
    width:      21,
    height:     21,
    marginLeft: 10,
  },
  headerBg:{
    width:  screenWidth,
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
    marginTop:          15,
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
    // backgroundColor: 'orange', 
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

export default styles