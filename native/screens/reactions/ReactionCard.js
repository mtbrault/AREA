import React, {Component} from 'react';
import {View, Text, Input, StyleSheet, TouchableHighlight, TouchableOpacity, ScrollView} from 'react-native';
import { Button, Flex, WhiteSpace, WingBlank } from '@ant-design/react-native';
import CollapseView from 'react-native-collapse-view';
import axios from 'axios';
import API_URL from '../../config/uri';
import Modal from "react-native-modal";
import Ip from '../../constants/Ip';

class ActionScreen extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			confirmLoading: false,
			paramInput: ''
		}
	}

	showModal() {
		this.setState({
		  visible: true,
		});
	}

	sendAddRequest(param = null) {
		axios.post(`${Ip}/service/${this.props.service}/add/reactions`, {
			askType: this.props.data,
			param: param,
			actionId: this.props.id
		}).then((res) => {
			if (res) {
				if (res.data.id === undefined) {
					console.log("error")
					return
				}
				if (this.props.data.param)
					this.setState({visible: false, confirmLoading: false})
				res.data.count = 0
				this.props.update(res.data)
			}
		}).catch((err) => {
			console.log(err)
		})
	}

	addAction() {
		console.log("Add action")
		if (this.props.data.param) {
			this.showModal()
		} else {
			this.sendAddRequest()
		}
	}

	deleteAction() {
		axios.post(`${Ip}/service/${this.props.service}/delete/reactions`, {
			item: this.props.data
		}).then((res) => {
			if (res) {
				console.log("data: ", res.data)
				if (res.data === "OK") {
					this.props.update(this.props.data)
				} else {
					console.log("Could not delete")
				}
			}
		}).catch((err) => {
			console.log(err)
		})
	}

	_renderTypeItem = (data, i) => {
		console.log("rendering", data)
		return (
    		<View style={[{ backgroundColor: `#${data.color}`,
			flex: 1,
			flexDirection: 'column',
			justifyContent: 'space-between', }, styles.item]} key={i}>
			<Text style={styles.cardText}>{data.nom}</Text>
			<TouchableHighlight onPress={() => this.addAction()} underlayColor="white">
				<Text style={styles.cardTextTypesBottom}>+</Text>
			</TouchableHighlight>
		</View>
	)};

	renderName = (name, param) => {
		if (param !== null) {
			return (name.replace('X', param))
		} else
			return (name)
	}

	_renderElemItem = (data, i) => (
		<View style={[{ backgroundColor: `#${data.color}`,
			flex: 1,
			flexDirection: 'column',
			justifyContent: 'space-between', }, styles.item]} key={i}
		>
			<View style={[{flex: 3,
			flexDirection: 'row',
			justifyContent: 'space-between', }]}>
				<Text style={styles.cardText}>{this.renderName(data.nom, data.param)}</Text>
			</View>
			<View style={[{flex: 1,
			flexDirection: 'row',
			justifyContent: 'space-between', }]}
			>
				<TouchableHighlight onPress={() => this.deleteAction()} underlayColor="white">
					<Text style={styles.cardText}>X</Text>
				</TouchableHighlight>
			</View>
		</View>
	);

	loadModal() {
		return (
			<Modal isVisible={this.state.visible}>
				<Text>{this.props.data.nom}</Text>
			</Modal>
		)
	}//<Input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>

	render() {
		return (
			<>
			
			{ this.props.content === "type" ?
				this._renderTypeItem(this.props.data, this.props.idx) :
				this._renderElemItem(this.props.data, this.props.idx)
			}
			{this.props.content === "elem" ? this.loadModal() : <></>}
			</>
		)
	}
}


const styles = StyleSheet.create({
	item: {
		flex: 1,
		height: 160,
		margin: 1
	},
	cardText: {
		fontSize: 20,
		color: 'white',
		fontWeight: 'bold',
		margin: 6
	},
	cardTextTypesBottom: {
		fontSize: 25,
		color: 'white',
		fontWeight: 'bold',
		marginLeft: 10,
		marginRight: 10,
		textAlign: 'right'
	}
  });

export default(ActionScreen)

