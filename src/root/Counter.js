import React, { Component } from 'react'
import{
	View,
	Button,
	Text,
}from 'react-native'

export default class Counter extends Component {
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
					onPress = {decrement}
				/>
					<Text>文字{counter}</Text>
				<Button
					style   = {{backgroundColor: 'orange'}} 
					title   = {'+'} 
					onPress = {increment}
				/>
			</View>
		)
	}
}
