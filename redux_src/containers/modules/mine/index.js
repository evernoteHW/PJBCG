import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { NavigationActions } from 'react-navigation'

import Mine from '../../../components/modules/mine'

import * as mineActions from '../../../actions/mineActions'

//分发更改之后的state 改变的东西
const mapStateToProps = state => {
	return{
		fetchResult: state.mineFetchResult	
	}
}
const mapDispatchToProps = (dispatch,ownProps) =>{
	return{
		mineActions: bindActionCreators(mineActions,dispatch),
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Mine)