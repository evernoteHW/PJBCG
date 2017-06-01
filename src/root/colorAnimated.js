// var React = require('react-native');
// var {
//     AppRegistry,
//     StyleSheet,
//     Component,
//     Dimensions,
//     View,
//     TouchableOpacity,
//     Text,
//     Image,
//     Animated,
//     } = React;

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  TouchableOpacity,
  Modal,
  DeviceEventEmitter,
  Dimensions,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class PJBCG extends Component {
    constructor() {
        super();
        this.state = {
            x: new Animated.Value(0),
            onRight: false,
        };
    }

    render() {
        var color = this.state.x.interpolate({
            inputRange: [0, SCREEN_WIDTH - 40, Number.MAX_VALUE],
            outputRange: ['rgba(0, 0, 0, 0.8)',  'rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0)']
        });

        return (
            <View style={styles.container}>
                <View style={{flex:1, justifyContent: 'center'}}>
                    <TouchableOpacity style={styles.button} onPress={this._onPress.bind(this)}>
                        <Text>Move</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1, justifyContent: 'center'}}>
                    <Animated.View style={[styles.colorContainer, {backgroundColor:color}]}/>
                    <Animated.View style={[styles.movingBox, {left:this.state.x}]}/>
                </View>
            </View>
        );
    }

    _onPress() {
        this.setState({
            onRight: !this.state.onRight
        });
        Animated.spring(
            this.state.x,
            {
                toValue: this.state.onRight ? SCREEN_WIDTH - 40 : 0
            }
        ).start();
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    button: {
        padding: 20,
        borderWidth: 1,
        borderRadius: 5,
    },
    colorContainer: {
        height: 40,
        width: SCREEN_WIDTH,
        borderWidth: 1,
    },
    movingBox: {
        width: 40,
        height: 40,
        backgroundColor: 'red'
    }
});

AppRegistry.registerComponent('PJBCG', () => PJBCG);