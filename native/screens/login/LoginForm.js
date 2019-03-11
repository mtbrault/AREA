import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';
import styles from '../../constants/FormStyle';
import axios from 'axios';
import Ip from '../../constants/Ip';

const DisplayAlert = ({message, success}) => {
	const container = (success == true) ? styles.buttonSuccessContainer : styles.buttonAlertContainer;
	return (
		<View style={container}>
			<Text style={styles.buttonTxt}>{message}</Text>
		</View>
	);
}

class LoginForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errors: '',
			ip: ''
		}
		this.submitForm = this.submitForm.bind(this);
		this.setAuthToken = this.setAuthToken.bind(this);
	}

	setAuthToken = token => {
		if (token) {
			axios.defaults.headers.common['Authorization'] = 'JWT ' + token;
		}
		else {
			delete axios.defaults.headers.common['Authorization'];
		}
	}

	submitForm() {
		const user = {
			email: this.state.email,
			password: this.state.password
		}

		if (user.email == '') {
			this.setState({errors: 'Please enter an email'})
		} else if (user.password == '') {
			this.setState({errors: 'Please enter a password'})
		} else {
			this.setState({errors: ''});
			axios.post(Ip + '/user/login', user)
			.then(res => {
				this.setAuthToken(res.data.token);
				AsyncStorage.setItem('areaToken', res.data.token);
				this.props.navigation.navigate('Home');
			})
			.catch(err => {
				console.log("error");
				this.setState({errors: err.response.data.message});
			})
		}
	}

	render() {
		return (
			<View style={styles.containerForm}>
				<TextInput 
					placeholder="Email"
					placeholderTextColor="rgba(0,0,0,0.7)"
					returnKeyType="next"
					autoCapitalize="none"
					autoCorrect={false}
					style={styles.input}
					onChangeText={(mail) => this.setState({email: mail})}
				/>
				<TextInput
					placeholder="Password"
					placeholderTextColor="rgba(0,0,0,0.7)"
					returnKeyType="go"
					secureTextEntry
					style={styles.input}
					onChangeText={(pass) => this.setState({password: pass})}
				/>
				{this.state.errors != '' && <DisplayAlert success={false} message={this.state.errors} />}
				<TouchableOpacity style={styles.buttonContainer}
								  onPress={this.submitForm}>
					<Text style={styles.buttonTxt}>CONNEXION</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default LoginForm;