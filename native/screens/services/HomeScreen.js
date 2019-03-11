import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import styles from '../../constants/ServiceStyle';
import Service from './Services';
import io from 'socket.io-client';
import API_URL from '../../config/uri';

const socket = new io(API_URL);

class HomeScreen extends Component {

	constructor(props) {
		super(props);
		this.state = {
			facebook: false
		}
		this.logout = this.logout.bind(this);
		this.getServiceAdded = this.getServiceAdded.bind(this);
	}

	logout() {
		AsyncStorage.removeItem('areaToken');
		this.props.navigation.navigate('Login');
	}

	getServiceAdded() {
		axios.post(`${API_URL}/getToken`).then((res) => {
			if (res) {
				res.data.map((data) => {
					console.log(data)
					this.setState({
						[data.nom]: true
					})
				})
			}
			console.log(this.state);
		}).catch((err) => {
			console.log(err);
		})
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Connect your services</Text>
				<View style={styles.serviceLine}>
					<Service
						image={'../../assets/trello.png'} 
						styleValue={styles.trelloCard}
						socket={socket}
					/>
				</View>
				<TouchableOpacity onPress={this.logout}>
					<Text style={styles.logout}>Logout</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default HomeScreen;