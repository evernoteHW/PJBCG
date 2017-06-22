import { connect } from 'react-redux'
import Login from '../../../components/modules/login'
import { bindActionCreators } from 'redux'
import * as loginActions from '../../../actions/loginActions'
import * as mineActions from '../../../actions/mineActions'
import * as homeActions from '../../../actions/homeActions'
import * as financeActions from '../../../actions/financeActions'

const mapStateToProps = state =>{
	return{
		loginReducer: state.loginReducer,
	}
}
const mapDispatchToProps = dispatch =>{
	return{
		loginActions:   bindActionCreators(loginActions,dispatch),
		homeActions:    bindActionCreators(homeActions,dispatch),
		financeActions: bindActionCreators(financeActions,dispatch),
		mineActions:    bindActionCreators(mineActions,dispatch),
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)