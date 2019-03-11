import React, {Component} from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
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

class RegisterForm extends Component {

	constructor(props) {
		super(props);
		this.state = {
			mail: "",
			login: "",
			password: "",
			confirmPassword: "",
			errors: '',
			success: ''
		}
		this.submitForm = this.submitForm.bind(this);
	}

	submitForm() {
		const user = {
			username: this.state.login,
			email: this.state.mail,
			password: this.state.password
		}

		if (user.username == '')
			this.setState({errors: 'Please enter a username'})
		else if (user.email == '')
			this.setState({errors: 'Please enter an email'})
		else if (user.password == '')
			this.setState({errors: 'Please enter a password'})
		else if (this.state.password !== this.state.confirmPassword) {
			this.setState({errors: 'Your passwords are not the same'})
		} else {
			axios.post(Ip + '/user/register', user)
			.then(res => {
				this.setState({errors: '', success: 'Creation OK ! You can now login'})
			})
			.catch(err => {
				this.setState({errors: err.response.data.message})
			})
		}
	}

	render() {
		return (
			<View style={styles.containerForm}>
				<TextInput
					placeholder="Email address"
					placeholderTextColor="rgba(0,0,0,0.7)"
					returnKeyType="next"
					autoCapitalize="none"
					autoCorrect={false}
					style={styles.input}
					onChangeText={(maiil) => this.setState({mail: maiil})}
				/>
				<TextInput 
					placeholder="Username"
					placeholderTextColor="rgba(0,0,0,0.7)"
					returnKeyType="next"
					autoCapitalize="none"
					autoCorrect={false}
					style={styles.input}
					onChangeText={(log) => this.setState({login: log})}
				/>
				<TextInput
					placeholder="Password"
					placeholderTextColor="rgba(0,0,0,0.7)"
					returnKeyType="next"
					secureTextEntry
					style={styles.input}
					onChangeText={(pass) => this.setState({password: pass})}
				/>
				<TextInput
					placeholder="Confirm password"
					placeholderTextColor="rgba(0,0,0,0.7)"
					returnKeyType="go"
					secureTextEntry
					style={styles.input}
					onChangeText={(passw) => this.setState({confirmPassword: passw})}
				/>
				{this.state.errors != '' && <DisplayAlert success={false} message={this.state.errors} />}
				{this.state.success != '' && <DisplayAlert success={true} message={this.state.success} />}
				<TouchableOpacity style={styles.buttonContainer}
									onPress={this.submitForm}>
						<Text style={styles.buttonTxt}>INSCRIVEZ VOUS</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default RegisterForm;