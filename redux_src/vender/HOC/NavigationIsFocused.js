import { connect } from 'react-redux';
import React, { Component } from 'react';

function withNavigationIsFocused(WrappedContainer) {

    return class extends React.Component {
        static navigationOptions = {
            ...WrappedContainer.navigationOptions
        };

        constructor(props) {
            super(props);
            this.state = {
                isFocused: false,
            }
        }

        _checkRoute = (props) => {
            if (this.props.navigation.state.routeName === props.currentRoute) {
                this.setState({isFocused:true});
            }
            else {
                this.setState({isFocused: false});
            }
        };

        componentDidMount() {
            this._checkRoute(this.props);
        }

        componentWillReceiveProps(newProps) {
            this._checkRoute(newProps);
        }

        render() {
            return <WrappedContainer isFocused={this.state.isFocused} {...this.props} />;
        }
    }
}

export function connectWithNavigationIsFocused(mapStateToProps, mapDispatchToProps, navigator) {
    return function (container) {

        let addNavigationMapStateToProps = function (state) {
            let map = mapStateToProps(state);
            return {
                ...map,
                currentRoute: state[navigator].currentRoute
            }
        };

        return connect(addNavigationMapStateToProps, mapDispatchToProps)(withNavigationIsFocused(container));
    }
}