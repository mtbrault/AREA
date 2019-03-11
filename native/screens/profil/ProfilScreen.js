import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Axios from 'axios';

class ProfilScreen extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log('coucou');
	}

	render() {
		return (
			<View style={styles.container}>
				<Text>test</Text>
			</View>
		);
	}
}

export default ProfilScreen;

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
  });