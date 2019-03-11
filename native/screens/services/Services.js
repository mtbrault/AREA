import React, { Component } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation'

class Service extends Component {
	constructor(props) {
		super(props)
	}
	state = {
		user: {},
		disabled: true
	}

	startAuth = () => {
		const { socket } = this.props;
		this.props.navigation.navigate('WebViewScreen', { socket: socket })
	}

	render() {
		return (
			<TouchableHighlight onPress={this.startAuth}>
				<Image source={require('../../assets/trello.png')} style={this.props.styleValue} />
			</TouchableHighlight>
		)
	}
}

export default withNavigation(Service);