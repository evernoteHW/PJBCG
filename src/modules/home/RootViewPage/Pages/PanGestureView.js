// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  * @flow
//  */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  PanResponder,
  Animated,
  Easing,
} from 'react-native';

export default class PanGestureView extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
    	 pan:    new Animated.ValueXY(),
       zIndex:      0,
       frame:       {},
       needUpdate:  true,
       old_move_dx: 0,
       old_move_dy: 0,
    };
  }
  shouldComponentUpdate(nextProps,nextState){
    return nextState.needUpdate
  }
  startMove(frame_from = {x: 0, y: 0, width: 0 ,height: 0},frame_to = {x: 0, y: 0, width: 0 ,height: 0},doneCallBack){

      let toValue_x = frame_to.x - frame_from.x + this.state.old_move_dx
      let toValue_y = frame_to.y - frame_from.y + this.state.old_move_dy
      const commonConfig = {
        duration: 300,
        easing:   Easing.out(Easing.quad)
      }
      Animated.timing(this.state.pan, {
        toValue: {x: toValue_x, y: toValue_y},
        ...commonConfig
      }).start(() => {
        this.setState({
          frame:       frame_to, 
          needUpdate:  false,
          old_move_dx: toValue_x, 
          old_move_dy: toValue_y,
        })
        this.setState({
          zIndex: 0, 
          needUpdate: true
        })
        doneCallBack()
      });    
  }
  restart(doneCallBack){
    this.startMove({x: 0, y: 0, width: 0 ,height: 0},{x: 0, y: 0, width: 0 ,height: 0},doneCallBack)
  }
  startAnimation(move_length_x,move_length_y,doneCallBack){

      let toValue_x = move_length_x + this.state.old_move_dx
      let toValue_y = move_length_y + this.state.old_move_dy
      const commonConfig = {
        duration: 300,
        easing:   Easing.out(Easing.quad)
      }
      Animated.timing(this.state.pan, {
        toValue: {x: toValue_x, y: toValue_y},
        ...commonConfig
      }).start(() => {
        this.setState({zIndex: 0,old_move_dx: toValue_x , old_move_dy: toValue_y, needUpdate: true})
        doneCallBack()
      });    
  }

  componentWillMount() {
      this._animatedValueX = 0;
      this._animatedValueY = 0; 
      this.state.pan.x.addListener((callback) => { this._animatedValueX = callback.value });
      this.state.pan.y.addListener((callback) => { this._animatedValueY = callback.value });
	    this._panResponder = PanResponder.create({
	      onMoveShouldSetResponderCapture: () => true, 
	      onMoveShouldSetPanResponderCapture: () => true,
	      onPanResponderGrant: (e, gestureState) => {
          if (this.props.onPanResponderGrant) {
              this.props.onPanResponderGrant()
          }
          this.setState({zIndex: 10, needUpdate: true})
	        this.state.pan.setOffset({x: this._animatedValueX, y: this._animatedValueY});
	        this.state.pan.setValue({x:  0, y: 0});
	      },
	      onPanResponderMove: Animated.event([
	        null, {dx: this.state.pan.x, dy: this.state.pan.y}
	      ]), 
	      onPanResponderRelease: (e, gestureState) => {
          this.state.pan.flattenOffset();
          let x =  this.state.frame.x + this.state.frame.width/2.0 + gestureState.dx
          let y =  this.state.frame.y + this.state.frame.height/2.0 + gestureState.dy
          if (this.props.onPanResponderRelease) {
              this.props.onPanResponderRelease(this,this.state.index,{x,y})
          }
	      },
	  });
  }
  componentWillUnmount() {
    this.state.pan.x.removeAllListeners();  
    this.state.pan.y.removeAllListeners();
  }
  setFrameAndIndex(frame){
    this.setState({frame: frame, needUpdate: false});
  }
  render() {

    return (
        <Animated.View 
          ref      = {(component) => this.panGesture = component}
          onLayout = {(e)    => {
              const {x ,y , width ,height } = e.nativeEvent.layout
              this.setState({frame: {x,y,width,height}});
            }
          }
        	style = {[
              this.props.style,
              {
                transform: [
                  {
                    translateX: this.state.pan.x
                  },
                  {
                    translateY: this.state.pan.y
                  },
                ]
              },{ zIndex:  this.state.zIndex }
            ]
        	}
        	{...this._panResponder.panHandlers}
        >
        {this.props.children}
        </Animated.View>
    );
  }
}
