/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 * 
*/
 import { AppRegistry } from 'react-native'
// import PJBCG from './src/root'
// import PJBCG from './src/root/colorAnimated'
// import PJBCG from './src/root/testGesture'
// import PJBCG from './src/root/realmDemo'
import PJBCG from './src/root/ReduxDemo1'
let SPY_MODE = true
console.ignoredYellowBox = ['Warning: BackAndroid']
AppRegistry.registerComponent('PJBCG', () => PJBCG);