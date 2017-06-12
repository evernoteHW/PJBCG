
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';

import { connect } from 'react-redux';
import Counter from './Counter'
//创建Actions
import * as counterActions from './actions'


// class CounterApp extends Component {
// 	constructor(props) {
//   	  super(props);
//     }
// 	render(){
// 		// const { state, actions } = this.props;
// 		const { state, increment,decrement } = this.props;
// 		// var counter = 0
// 		// if (state != undefined && state.count != undefined) {
// 		// 	counter = state.count
// 		// }
// 		return (
// 			<Counter
// 			  // counter = {counter}
// 			  counter    = {state.count}
// 			  increment  = {increment}
// 			  decrement  = {decrement}
//         	  // {...actions}
// 			/>
// 		)
// 	}
// }

// const mapStateToProps = (state) => {
//   return {
//     state: state.counter,
//   }
// }
// const mapDispatchToProps = (dispatch, ownProps) => {
//   return {
//     increment: (...args) => dispatch(counterActions.increment(...args)),
//     decrement: (...args) => dispatch(counterActions.decrement(...args))
//   }
// }
// export default connect(mapStateToProps,mapDispatchToProps)(CounterApp);

class CounterApp extends Component {
	constructor(props) {
  	  super(props);
    }
	render(){
		const { state, actions } = this.props;
		return (
			<Counter
			  counter    = {state.count}
        	  {...actions}
			/>
		)
	}
}

export default connect(state=>{
	return {
		state: state.counter,
	}
},(dispatch) => ({
    actions: bindActionCreators(counterActions, dispatch)
  }))(CounterApp);