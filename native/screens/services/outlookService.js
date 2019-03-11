import React, { Component } from 'react';
import { Image, TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation'

class OutlookService extends Component {
	constructor(props) {
		super(props)
	}
	state = {
		user: {},
		disabled: true
	}

	startAuth = () => {
		this.props.navigation.navigate('WebViewScreenOutlook')
	}

	render() {
		return (
			<TouchableHighlight onPress={this.startAuth}>
				<Image source={require('../../assets/outlook.png')} style={this.props.styleValue} />
			</TouchableHighlight>
		)
	}
}

export default withNavigation(OutlookService);