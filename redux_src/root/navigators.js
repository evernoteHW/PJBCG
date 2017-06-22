import React,{ Component } from 'react'
import { StackNavigator,addNavigationHelpers } from 'react-navigation'
import TabBarsContainer,{ TabBars } from './tarbar'
import Setting               from '../components/modules/settings'
import { connect } from 'react-redux';

// import Attention             from '../modules/attention'

// import WebViewPage           from '../modules/home/RootViewPage/Pages/WebViewPage'
// import ChannelManagePage     from '../modules/home/RootViewPage/Pages/ChannelManagePage'
// import MoreChannelCityPage   from '../modules/home/RootViewPage/Pages/MoreChannelCityPage'
// import AttentionTagPage      from '../modules/attention/AttentionTagPage'
// import Guide                 from '../modules/guide'
// import Login                 from '../components/modules/login'
// import MessageCenter         from '../modules/messageCenter'
// import Setting               from '../components/modules/settings'
// import PersonHomePage        from '../modules/personHomePage'
import Login from '../components/modules/login'
export const App = StackNavigator({
    TabBars:             { screen: TabBarsContainer },
    // Login:       { screen: Login },
    // // AttentionTagPage: { screen: AttentionTagPage },
    // ChannelManagePage:   { screen: ChannelManagePage},
    Setting:             {screen: Setting},
    // PersonHomePage:      { screen: PersonHomePage},
},{
    headerMode:           'screen' ,
    mode:                 'none',

});
class AppNavigator extends Component{
	render(){
		const { dispatch, appReducer} = this.props
		return(
			<App navigation = {addNavigationHelpers({ dispatch, state: appReducer})}/>
		);
	}
}

const mapStateToProps = state =>{
	return {
		appReducer: state.appReducer
	}
}
export default connect(mapStateToProps)(AppNavigator)