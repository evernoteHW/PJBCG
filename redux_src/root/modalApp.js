import React,{ Component }  from 'react'
import { StackNavigator,addNavigationHelpers } from 'react-navigation'
import AppNavigator,{ App } from './navigators'
import Login from '../components/modules/login'
import { connect } from 'react-redux';

const ModalApp = StackNavigator({
    MainCardNavigator: { screen: AppNavigator },
    Login:             { screen: Login}
},{
    headerMode: 'none' ,
    mode:       'modal',

});
 export default ModalApp

// export default class ModalAppNavigator extends Component{
// 	render(){
// 		const { dispatch, appReducer} = this.props
// 		return(
// 			// <ModalApp navigation = {addNavigationHelpers({ dispatch, state: appReducer})}/>
// 			<ModalApp />
// 		);
// 	}
// }

// // const mapStateToProps = state =>{
// // 	return {
// // 		appReducer: state.appReducer
// // 	}
// // }
// export default connect()(ModalAppNavigator)
