import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, ScrollView} from 'react-native';
import { Button, Flex, WhiteSpace, WingBlank } from '@ant-design/react-native';
import CollapseView from 'react-native-collapse-view';
import axios from 'axios';
import Ip from '../../constants/Ip';
import ActionCard from './ActionCard'
import Grid from 'react-native-grid-component';

class ActionScreen extends Component {

	constructor(props) {
		super(props);
		this.state = { types: [], data: [], loading: true }
		this.service = 'facebook'
		this.getData();
	}
	
	getData() {
		console.log(this.service)
		axios.post(`${Ip}/service/${this.service}/get/actions`).then((res) => {
			if (res) {
				console.log("data: ", res.data)
				if (res.data.types !== undefined && res.data.data !== undefined)
					this.setState({ types: res.data.types, data: res.data.data, loading: false })
			}
		}).catch((err) => {
			console.log(err)
		})
	}

	addAction(type) {
		var list = [...this.state.data]
		list.push(type)
		this.setState({ data: list })
	}

	removeAction(type) {
		console.log("before : ", this.state.data)
		var list = [...this.state.data]
		list.splice(list.indexOf(type), 1);
		this.setState({ data: list })
	}

	componentDidMount() {
		console.log('coucou');
	}

	_renderTypeItem = (type, i) => <ActionCard content={"type"} data={type} idx={i} service={this.service} update={this.addAction.bind(this)}/>
	_renderElemItem = (elem, i) => <ActionCard content={"elem"} data={elem} idx={i} service={this.service} update={this.removeAction.bind(this)}/>

	_renderPlaceholder = i => <View style={styles.item} key={i}/>;

	render() {

		return (
			<ScrollView
			style={{ flex: 1 }}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
				showsVerticalScrollIndicator={false}
			>
			<View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <View style={{width: '100%', height: 50, backgroundColor: 'rgb(17, 17, 17)'}}>
					<Text style={{color: 'white', fontSize: 40, fontWeight: 'bold'}}>AREA</Text>
				</View>
				<Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>Types :</Text>
        <Grid
        style={styles.list}
        renderItem={this._renderTypeItem}
        renderPlaceholder={this._renderPlaceholder}
        data={this.state.types}
        itemsPerRow={2}
      />
			<View style={{width: '100%', height: 30, backgroundColor: 'white'}}>
					<Text style={{color: 'black', fontSize: 15, fontWeight: 'bold'}}>Actions :</Text>
				</View>
			  <Grid
        style={styles.list}
        renderItem={this._renderElemItem}
        renderPlaceholder={this._renderPlaceholder}
        data={this.state.data}
        itemsPerRow={2}
      />
      </View>
			</ScrollView>
		)
	}
}

export default ActionScreen;

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  backgroundColor: '#fff',
	  alignItems: 'center',
	  justifyContent: 'center',
	},
	titleMain: {
		color: 'red',
	},
	item: {
    flex: 1,
    height: 160,
    margin: 1
  },
  list: {
    flex: 1
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