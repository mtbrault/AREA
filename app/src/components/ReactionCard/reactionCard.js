import React, { Component } from 'react';
import { Col, Row, Modal, Input, Popconfirm, message} from 'antd';
import Styles from './reactionCard.less';
import axios from 'axios';
import API_URL from '../../config/uri';
import AddIcon from '../../assets/img/add.png'
import DelIcon from '../../assets/img/delete.png'

class ReactionCard extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false,
			confirmLoading: false,
			paramInput: ''
		}
		console.log(props)
	}

	showModal() {
		this.setState({
		  visible: true,
		});
	}

	sendAddRequest(param = null) {
		axios.post(`${API_URL}/service/${this.props.service}/add/reactions`, {
			askType: this.props.type,
			param: param,
			actionId: this.props.actionId
		}).then((res) => {
			if (res) {
				if (res.data.id === undefined) {
					message.error("An error occured")
					return
				}
				console.log(res.data)
				this.props.update(res.data)
				if (this.props.type.param === true) {
					this.setState({visible: false, confirmLoading: false})
				}
				message.success('Successfully added reaction');
			}
		}).catch((err) => {
			console.log(err)
		})
	}

	addReaction() {
		if (this.props.type.param === true) {
			this.showModal()
			return
		}
		this.sendAddRequest();
	}

	deleteReaction() {
		console.log("sending: ")
		console.log(this.props.data)
		axios.post(`${API_URL}/service/${this.props.service}/delete/reactions`, {
			item: this.props.data
		}).then((res) => {
			if (res) {
				console.log("data: ", res.data)
				if (res.data === "OK") {
					this.props.update(this.props.data)
					message.success("Successfully deleted reaction");
				} else {
					message.error("An error occured")
				}
			}
		}).catch((err) => {
			console.log(err)
		})
	}

	handleOk = () => {
		this.setState({
		  ModalText: 'The modal will be closed after two seconds',
		  confirmLoading: true,
		});
		this.sendAddRequest(this.state.inputValue)
	}

	handleCancel = () => {
		console.log('Clicked cancel button');
		this.setState({
		  visible: false,
		});
	}

	updateInputValue(evt) {
		this.setState({
		  inputValue: evt.target.value
		});
	}

	loadModal() {
		return (
			<Modal
				title={"Parameter needed"}
				visible={this.state.visible}
				onOk={this.handleOk}
				confirmLoading={this.state.confirmLoading}
				onCancel={this.handleCancel}
			>
				<h4>{this.props.type.nom}</h4>
				<h4>Where X is :</h4>
				<Input value={this.state.inputValue} onChange={evt => this.updateInputValue(evt)}/>
			</Modal>
		)
	}

	affName() {
		if (this.props.type !== undefined)
			return (<span>{this.props.type.nom}</span>)
		else if (this.props.data.param === null) {
			return (<span>{this.props.data.nom}</span>)
		}
		var name = this.props.data.nom
		name = name.split("X")
		console.log(name)
		return (
			<span>
				{name[0]}
				<i className="paramSpan">{this.props.data.param}</i>
				{name[1]}
			</span>
		)
	}

	render() {
		const color = (this.props.data !== undefined ? this.props.data.color : this.props.type.color)
		console.log('color', color)
		return (
		<Col span={3} className={`${Styles.reactionCard} ${this.props.data === undefined ? Styles.miniReactionCard: ""}`} style={{backgroundColor: `#${color}`}} type="flex">
			<Row className={`${Styles.cardRow} ${Styles.upperRow}`}>
				{this.affName()}
			</Row>
			<Row className={`${Styles.cardRow} ${Styles.lowerRow}`}>
				{this.props.data !== undefined ? <span style={{height: "58%"}}></span> : ""}
				<Row gutter={12} type="flex" justify="space-between">
					<Col className="gutter-row" span={6}>
						<span></span>
					</Col>
					<Col className="gutter-row" span={6}>
					{ this.props.type !== undefined ?
						<img className={Styles.addIcon} src={AddIcon} onClick={this.addReaction.bind(this)}/>
					:
						<Popconfirm placement="topLeft" title={"Are you sure ?"} onConfirm={this.deleteReaction.bind(this)} okText="Yes" cancelText="No">
							<img className={Styles.deleteIcon} src={DelIcon}/>
						</Popconfirm>
					}
					</Col>
				</Row>
			</Row>
			{this.props.type !== undefined ? this.loadModal() : ""}
		</Col>
		)
	}
}

export default ReactionCard