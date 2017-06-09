import React, { Component } from 'react';

import { 
	createStore, 
	applyMiddleware, 
	combineReducers,
	bindActionCreators, 
} from 'redux';

import { Provider,connect } from 'react-redux';

//创建Actions

function increment() {
  return {
    type: 'INCREMENT'
  };
}

function decrement() {
  return {
    type: 'DECREMENT'
  };
}
//创建Reducer
//主要是用来 对Actions里面的State改变

const initialState = {
  count: 0
};

function counter(state = initialState, action = {}) {
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        count: state.count + 1
      };
    case 'DECREMENT':
      return {
        ...state,
        count: state.count - 1
      };
    default:
      return state;
  }
}

let rootReducers = combineReducers({
	counter,
})
const store = createStore(rootReducers);

import { 
	AppRegistry, 
	Text ,
	View,
	Button,
} from 'react-native';
//Action -> Reducer ->Store->View
export default class PJBCG extends Component {
  render() {
  	
    return (
	<Provider 
		store={store}
	>
	     <View style={{justifyContent: 'center',flex: 1, alignItems: 'center',backgroundColor: '#F5FCFF'}}>
			<CounterApp />
	     </View>
	 </Provider>   
    );
  }
}
class CounterApp extends Component {
	constructor(props) {
  	  super(props);
    }
	render(){
		const { state, actions } = this.props;
		return (
			<Counter
			  // counter={state.count}
        	  {...actions}  
			/>
		)
	}
}
const counterActions = [increment,decrement]

connect(state => ({
    state: state.counter
  }),
  (dispatch) => ({
    actions: bindActionCreators(counterActions, dispatch)
  })
)(CounterApp);

class Counter extends Component {
	constructor(props) {
  	  super(props);
    }
	render(){
		const { counter, increment, decrement } = this.props;
		return (
			<View style={{flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
				<Button 
				 	style 	= {{backgroundColor: 'orange'}}
					title   = {'-'} 
					onPress = {increment}
				/>
					<Text>文字{counter}</Text>
				<Button
					style   = {{backgroundColor: 'orange'}} 
					title   = {'+'} 
					onPress = {decrement}
				/>
			</View>
		)
	}
}

Counter.propTypes = {
   increment: React.PropTypes.func,
   decrement: React.PropTypes.func,
}


