import React, { Component } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation'

class InstagramService extends Component {
	constructor(props) {
		super(props)
	}
	state = {
		user: {},
		disabled: true
	}

	startAuth = () => {
		this.props.navigation.navigate('WebViewScreenInstagram')
	}

	render() {
		return (
			<TouchableHighlight onPress={this.startAuth}>
				<Image source={require('../../assets/instagram.png')} style={this.props.styleValue} />
			</TouchableHighlight>
		)
	}
}

export default withNavigation(InstagramService);