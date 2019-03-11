import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage, TouchableOpacity } from 'react-native';
import styles from '../constants/ServiceStyle';
//import Facebook from './services/facebookService';
import Trello from './services/trelloServices';
import Spotify from './services/spotifyService';
import Outlook from './services/outlookService';
import Twitter from './services/twitterService';
import Instagram from './services/instagramService';
import io from 'socket.io-client';
import API_URL from '../config/uri';

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

	getActions = () => {
		this.props.navigation.navigate('Actions');
	}

	render() {
		return (
			<View style={styles.container}>
				<TouchableOpacity onPress={this.getActions}>
					<Text style={styles.title}>Connect your services</Text>
				</TouchableOpacity>
				<View style={styles.serviceLine}>
					<Trello styleValue={styles.trelloCard} socket={socket} />
					<Twitter styleValue={styles.twitterCard} socket={socket} />
					<Outlook styleValue={styles.outlookCard} socket={socket} />
				</View>
				<View style={styles.serviceLine}>
					<Instagram styleValue={styles.instagramCard} socket={socket} />
					<Spotify styleValue={styles.spotifyCard} socket={socket} />
				</View>
				<TouchableOpacity onPress={this.logout}>
					<Text style={styles.logout}>Logout</Text>
				</TouchableOpacity>
			
			</View>
		);
	}
}

export default HomeScreen;