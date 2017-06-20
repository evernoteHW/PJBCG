import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import Home from '../../../components/modules/home'
import * as homeActions from '../../../actions'

//分发更改之后的state 改变的东西
const mapStateToProps = state => {
	return{
		fetchResult: state.homeFetchResult	
	}
}
const mapDispatchToProps = dispatch =>{
	return{
		homeActions: bindActionCreators(homeActions,dispatch)
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Home)