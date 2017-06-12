import React, { Component } from 'react';

import {
	createStore,
	applyMiddleware,
	combineReducers,
	bindActionCreators,
} from 'redux';

import {
	AppRegistry,
	Text ,
	View,
	Button,
} from 'react-native';

import { Provider,connect } from 'react-redux';
import CounterApp from './CounterApp'

import * as reducers from './reducers';

let rootReducers = combineReducers(reducers)
const store = createStore(rootReducers);

export default class PJBCG extends Component {

  render() {
    return (
		<Provider store={store}>
		     <View style={{justifyContent: 'center',flex: 1, alignItems: 'center',backgroundColor: '#F5FCFF'}}>
				<CounterApp />
		     </View>
		 </Provider>
    );
  }
}


