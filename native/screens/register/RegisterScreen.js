import React, {Component} from 'react';
import {View, Image, Text, KeyboardAvoidingView} from 'react-native'
import styles from '../../constants/FormStyle';
import RegisterForm from './RegisterForm';

class RegisterScreen extends Component {
	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style={styles.imageContainer}>
					<Image style={styles.logo}
						   source={require('../../assets/netflex.png')} />
					<Text style={styles.subtitle}>AREA Epitech</Text>
				</View>
				<View>
					<RegisterForm navigation={this.props.navigation}/>
				</View>
			</KeyboardAvoidingView>	
		);
	}
}

export default RegisterScreen