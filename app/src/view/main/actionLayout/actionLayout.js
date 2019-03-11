import React, { Component } from 'react';
import { Layout, Row, Collapse, Spin } from 'antd';
import Styles from './actionLayout.less';
import axios from 'axios';
import API_URL from '../../../config/uri';
import ActionCard from '../../../components/ActionCard';
import { withRouter } from 'react-router-dom';

const Panel = Collapse.Panel;

class ActionLayout extends Component {
	constructor(props) {
		super(props)
		this.state = { types: [], data: [], loading: true }
		//this.service = this.props.location.pathname.substr("/actions/".length);
		this.service = this.props.match.params.service
		console.log(this.service)
		this.getData();
	}

	getData() {
		axios.post(`${API_URL}/service/${this.service}/get/actions`).then((res) => {
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
		var list = [...this.state.data]
		list.splice(list.indexOf(type), 1);
		this.setState({ data: list })
	}

	affActions() {
		const typesDisplay = (data) => {
			return (data.map((elem) => <ActionCard type={elem} service={this.service} update={this.addAction.bind(this)} />))
		}
		const actionDisplay = (data) => {
			return (data.map((elem) => <ActionCard data={elem} service={this.service} update={this.removeAction.bind(this)} />))
		}
		if (this.state.loading) {
			return (
				<Row gutter={16}>
					<Layout>
						<span>Loading</span>
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
				<Collapse bordered={false} defaultActiveKey={['1']} onChange={() => { console.log("collapse") }}>
					<Panel className="collapseHeader" header="Action types" key="1">
						<Row type="flex" gutter={20} justify="space-around" className={Styles.templateRow}>
							{typesDisplay(this.state.types)}
						</Row>
					</Panel>
				</Collapse>
				<Row type="flex" gutter={20} justify="start" className={Styles.actionsRow}>
					{actionDisplay(this.state.data)}
				</Row>
			</>
		)
	}

	render() {
		console.log("Initial : ", this.state.data)
		return (
			<Layout className={Styles.actionBox}>
				<center>
					<h3>Manage your actions</h3>
					<Row>
						{this.affActions()}
					</Row>
				</center>
			</Layout>
		)
	}
}

export default withRouter(ActionLayout);