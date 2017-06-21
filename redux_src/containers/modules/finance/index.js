import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import Finance from '../../../components/modules/finance'
import * as financeActions from '../../../actions/financeActions'

//分发更改之后的state 改变的东西
const mapStateToProps = state => {
	return{
		fetchResult: state.financeFetchResult	
	}
}
const mapDispatchToProps = dispatch =>{
	return{
		financeActions: bindActionCreators(financeActions,dispatch)
	}
}
export default connect(mapStateToProps,mapDispatchToProps)(Finance)