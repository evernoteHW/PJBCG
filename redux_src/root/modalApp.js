import React,{ Component }  from 'react'
import { StackNavigator,addNavigationHelpers } from 'react-navigation'
import AppNavigator,{ App } from './navigators'
import Login from '../containers/modules/login'
import { connect } from 'react-redux';
import Guide from '../components/modules/guide'
import * as guideActions from '../actions/guideActions.js'
import { bindActionCreators } from 'redux'

export const ModalApp = StackNavigator({
    MainCardNavigator: { screen: AppNavigator },
    Login:             { screen: Login}
},{
    headerMode: 'none' ,
    mode:       'modal',

});

class ModalAppNavigator extends Component{
	
	constructor(props) {
	    super(props);
	    // props.navigation.setParams({isNormal: false})
	    this.state = {
			isInstalled: props.isInstalled
	    };
	}

	render(){
		const { dispatch, modalReducer} = this.props
		if (!this.state.isInstalled) {
			return <Guide 
					guideActions = {guideActions} 
					register     = {() => this.setState({isInstalled: true})}
					goLook       = {()   => this.setState({isInstalled: true})}
				 />
		}
		return(
			 <ModalApp navigation = {addNavigationHelpers({ dispatch, state: modalReducer})} />
		);
	}
}

const mapStateToProps = state =>{
	return {
		modalReducer:       state.modalReducer,
		guideTouchResponse: state.guideTouchResponse
	}
}
const mapDispatchToProps = dispatch =>{
	return{
		guideActions: bindActionCreators(guideActions,dispatch),
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(ModalAppNavigator)
