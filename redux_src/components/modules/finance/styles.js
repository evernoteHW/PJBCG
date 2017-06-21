import { StyleSheet } from 'react-native';

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
    fontSize: 12,
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
    color:    '#3a3434',
    fontSize: 14,
    marginBottom: 16,
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

export default styles