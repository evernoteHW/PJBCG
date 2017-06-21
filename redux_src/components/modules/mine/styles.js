import { StyleSheet,Dimensions } from 'react-native';
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  container: {
    flex:            1,
    // flexDirection:  'row',
    backgroundColor: 'rgb(244,245,247)',
  },
  scrollView:{
    backgroundColor: 'white',
    flex:            1,
  },
  containerView:{
    flex:            1,
    // backgroundColor: 'white',
    // backgroundColor: 'orange',
  },
  headerBg:{
    height: 440/3.0
  },
  header:{
    position:        'absolute',
    // flexDirection:   'row',
    backgroundColor: 'white',
    shadowColor:     '#3a3433',
    shadowOffset:    {width: 0,height: 10},
    shadowRadius:    10,
    shadowOpacity:   0.15,
    left:            10,
    right:           10,
    top:             84,
    // height:          100,
    borderRadius:    5,
  },
  headerTop:{
    marginLeft:    15,
    marginTop:     15,
    flexDirection: 'row',
    alignItems:    'center',
  },
  headerTopRight:{
    alignItems:    'center',
    // right:      0,
    marginRight:   10,
    flexDirection: 'row'
  },
  headerTopRightText:{
    marginLeft: 5,
    color: '#8a8a8a'
  },
  headerTopRightIcon:{
    width: 15,
    height: 15,
  },
  headerIcon:{
    width:           50,
    height:          50,
    borderRadius:    25,
    // backgroundColor: 'orange',
  },
  headerNickName:{
    flex:               1,
    color:              '#333333',
    marginLeft:         10,
    fontSize:           16,
    // backgroundColor: 'yellow',
  },
  headerBottom:{
    marginBottom:   15,
    marginTop:      10,
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'center',
  },
  headerBottomItem:{
    flex: 3
  },
  headerBottomSeperator:{
    width:           1,
    backgroundColor: 'rgb(247,246,242)',
    height:          30,
  },
  headerBottomItemText:{
    color:        '#333333',
    marginBottom: 5,
    textAlign:    'center',
  },
  headerBottomItemSubText:{
    textAlign: 'center',
    color:     '#666666'
  },
  bottom:{
    marginLeft:    15,
    // marginTop:     200,
    marginRight: 15,
    
    // backgroundColor: 'white',
    flex:            1,
  },
  bottomItem1:{
    marginTop:     110,
  },
  bottomItem1LeftText:{
    color:    '#333333',
    fontSize: 14,
  },
  bottomItem1RightText:{
    color: '#e94e4e',
    fontSize: 27,
    // fontWeight: 'bold',
  },
  bottomItem2:{
    flex:           1,
    marginTop:      5,
    flexDirection:  'row',
    justifyContent: 'space-between',
  },
  bottomItem2TouchableOpacity:{
    flex:               2,
    // marginRight:     10,
    // backgroundColor: 'orange',
    // height:          60,
    alignItems:         'center',
    justifyContent:     'center',
  },
  bottomItem2Image:{
    flex:            1,
    marginTop:       0,
    marginLeft:      0,
    marginRight:     0,
    marginBottom:    0,
    // backgroundColor: 'red',
    width:        180,
    height:       168/3.0,
    alignItems:      'center',
    justifyContent:  'center',
  },
  bottomItem2Text:{
    backgroundColor: 'transparent',
    color:           'white',
    marginBottom:    5,
    fontSize:        15,
  },
  bottomItem3:{
    marginTop: 30,
    color:     '#666666'
  },
  bottomItem4:{
    marginTop:          10,
    flexDirection:      'row',
    flexWrap:           'wrap',
    // backgroundColor: 'red'
  },
  bottomItem4SubItemLeft:{
    width:           (screenWidth - 30 )/2.0,
    backgroundColor: 'white',
    // marginTop:       1,
    // marginRight:     1,
    flexDirection:   'row',
    alignItems:      'center',
  },
  bottomItem4SubItemRight:{
    width:           (screenWidth - 30 )/2.0,
    backgroundColor: 'white',
    // marginTop:    1,
    // marginRight:  1,
    flexDirection:   'row',
    alignItems:      'center',
  },
  bottomItem4SubItemImage:{
    marginTop: 10,
    marginRight: 5,
    marginBottom: 10,
    width:  130/3.0,
    height: 130/3.0,
  },
  bottomItem4SubItemText:{
    color:    '#333333',
    fontSize: 16,
  },
  bottomItem4SubItemSubText:{
    color:     '#666666',
    fontSize:  12,
    marginTop: 2,
  },
  bottomItem5:{
    flexDirection:   'row',
    marginTop:       10,
    backgroundColor: 'white',
    shadowColor:     '#3a3433',
    shadowOffset:    {width: 0,height: 10},
    shadowRadius:    10,
    shadowOpacity:   0.15,
    // left:         10,
    // right:        10,
    // top:          84,
    // height:       100,
    borderRadius:    5,
  },
  bottomItem5SubItem:{
    flex:           4,
    alignItems:     'center',
    justifyContent: 'center',
  },
  bottomItem5SubItemImage:{
    marginTop: 15,
    marginRight: 5,
    marginBottom: 10,
    width:  102/3.0,
    height: 65/3.0,
  },
  bottomItem5SubItemText:{
    color: '#666666',
    marginBottom: 13,
  },
  bottomItem6:{
    marginTop:      30,
    marginBottom:   30,
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'center',
  },
  bottomItem6Text:{
    color:      '#333333',
    marginLeft: 5,
  },
  bottomItem6SepertorLeft:{
    flex: 4,
    backgroundColor: 'rgb(242,238,235)',
    height: 0.5,
    marginRight: 5,
  },
   bottomItem6SepertorRight:{
    flex:            4,
    backgroundColor: 'rgb(242,238,235)',
    height:          0.5,
    marginLeft:      5,
  },
});

export default styles 