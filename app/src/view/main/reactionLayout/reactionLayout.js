import React, { Component } from 'react'
import { Layout, Row, Collapse, Spin } from 'antd'
import Styles from './reactionLayout.less'
import axios from 'axios'
import API_URL from '../../../config/uri'
import ReactionCard from '../../../components/ReactionCard'
import { withRouter } from 'react-router-dom'

const Panel = Collapse.Panel;

class ReactionLayout extends Component {
	constructor(props) {
		super(props)
		this.state = { types: [], data: [], loading: true, name: "", param: null }
		this.service = this.props.match.params.service;
		this.actionId = this.props.match.params.id
		this.getData();
	}

	expandTypes(raw) {
		if (!raw.length)
			return []
		var switz = raw[0].fk_services
		var res = []
		var tmp = []
		for (var i = 0; i < raw.length; i += 1) {
			if (switz !== raw[i].fk_services) {
				res.push(tmp)
				tmp = []
				switz = raw[i].fk_services
			}
			tmp.push(raw[i])
		}
		res.push(tmp)
		return (res)
	}

	getData() {
		axios.post(`${API_URL}/service/${this.service}/get/reactions`, {
			actionId: this.actionId
		}).then((res) => {
			if (res) {
				console.log("data: ", res.data)
				if (res.data.types !== undefined && res.data.data !== undefined)
					this.setState({ types: this.expandTypes(res.data.types), data: res.data.data, loading: false, name: res.data.name, param: res.data.param })
				else if (res.data === "Action was deleted")
					this.setState({ loading: false, name: res.data })
			}
		}).catch((err) => {
			console.log(err)
		})
	}

	addAction(type) {
		var list = [...this.state.data]
		list.push(type)
		console.log(type)
		this.setState({ data: list })
	}

	removeAction(type) {
		var list = [...this.state.data]
		list.splice(list.indexOf(type), 1);
		this.setState({ data: list })
	}

	displayReactionTypes() {

		const typesDisplay = (data) => {
			return (data.map((elem) => <ReactionCard type={elem} actionId={this.actionId} service={this.service} update={this.addAction.bind(this)} />))
		}

		return this.state.types.map((elem, idx) => {
			return (
				<Collapse accordion bordered={false} defaultActiveKey={['1']}>
					<Panel className="collapseHeader" header={elem[0].servicename} key={idx + 1}>
						<Row type="flex" gutter={20} justify="space-around" className={Styles.templateRow}>
							{typesDisplay(elem)}
						</Row>
					</Panel>
				</Collapse>
			)
		})
	}

	affActions() {
		const actionDisplay = (data) => {
			return (data.map((elem) => <ReactionCard data={elem} service={this.service} update={this.removeAction.bind(this)} />))
		}
		if (this.state.loading) {
			return (
				<Row gutter={16}>
					<Layout>
						<h4>Loading</h4>
						<Spin size="large" />
					</Layout>
				</Row>
			)
		}
		return (this.state.types.length === 0 ?
			<Row gutter={16}>
				<Layout>
					<h4>Sorry, service is not yet supported</h4>
					<a onClick={() => this.props.history.push('/services')}>Back to home</a>
				</Layout>
			</Row>
			:
			<>
				<Collapse onChange={() => { console.log("collapse") }}>
					<Panel className="collapseHeader" header="Reaction types" key="1">
						{this.displayReactionTypes()}
					</Panel>
				</Collapse>
				<Row type="flex" gutter={20} justify="start" className={Styles.actionsRow}>
					{actionDisplay(this.state.data)}
				</Row>
			</>
		)
	}

	render() {
		var title = ""
		if (this.state.name !== "" && this.state.param !== null && this.state.name.indexOf('X') !== -1) {
			var tmp = this.state.name.split('X')
			title = tmp[0] + this.state.param + tmp[1] + ' :'
		} else {
			title = this.state.name
		}
		return (
			<Layout className={Styles.actionBox}>
				<center>
					<h3>Manage your reactions</h3>
					<h4>{title}</h4>
					<Row>
						{this.affActions()}
					</Row>
				</center>
			</Layout>
		)
	}
}

export default withRouter(ReactionLayout);