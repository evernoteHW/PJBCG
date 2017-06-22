import React,{ Component }  from 'react'
import { StackNavigator,addNavigationHelpers } from 'react-navigation'
import AppNavigator,{ App } from './navigators'
import Login from '../containers/modules/login'
import { connect } from 'react-redux';

export const ModalApp = StackNavigator({
    MainCardNavigator: { screen: AppNavigator },
    Login:             { screen: Login}
},{
    headerMode: 'none' ,
    mode:       'modal',

});

class ModalAppNavigator extends Component{
	render(){
		const { dispatch, modalReducer} = this.props
		return(
			<ModalApp navigation = {addNavigationHelpers({ dispatch, state: modalReducer})}/>
		);
	}
}

const mapStateToProps = state =>{
	return {
		modalReducer: state.modalReducer
	}
}
export default connect(mapStateToProps)(ModalAppNavigator)
