import React, {Component} from 'react';
import {View, Image} from 'react-native';
import TrelloLogin from 'react-native-trello-login';

class TrelloService extends Component {

	constructor(props) {
		super(props);
		console.log("hello");
	}

	componentDidMount() {

	}

	handleLoginSuccess = trelloToken => {
		console.log(trelloToken);
	}

	handleLoginFailure = message => {
		alert(message);
	}

	startAuth = () => {
		this.props.navigation.navigate('WebViewScreenTrello')
	}

	render() {
		return (
			<View style={{backgroundColor: 'black'}}>
				<Image source={require('../../assets/trello.png')} style={ this.props.styleValue } />
			</View>
		)
	}
}

export default TrelloService;