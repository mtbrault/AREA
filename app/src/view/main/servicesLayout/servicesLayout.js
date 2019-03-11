//eslint-disable-next-line
import React, { Component } from 'react';
import { Layout, Col, Row, Button } from 'antd';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FacebookCard from '../../../components/FacebookCard';
import TwitterCard from '../../../components/TwitterCard';
import TrelloCard from '../../../components/TrelloCard';
import OfficeCard from '../../../components/OfficeCard';
import SpotifyCard from '../../../components/SpotifyCard';
import InstagramCard from '../../../components/InstagramCard';
import io from 'socket.io-client';
import API_URL from '../../../config/uri';
import Styles from './servicesLayout.less';
import axios from 'axios';

const socket = io(API_URL);

class ServicesLayout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: this.props.auth.user,
            twitter: false,
            facebook: false,
            trello: false,
            spotify: false,
            instagram: false,
            outlook: false
        }
        this.getServiceAdded = this.getServiceAdded.bind(this);
    }

    getServiceAdded() {
        axios.post(`${API_URL}/getToken`).then((res) => {
            if (res) {
                res.data.map((data) => {
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

    offAllServices = () => {
        axios.post(`${API_URL}/offAllServices`).then((res) => {
            console.log(res);
            window.location.reload();
        }).catch((err) => {
            console.log(err);
        })
    }
    componentDidMount() {
        this.getServiceAdded();
    }

    render() {
        return (
            <Layout className={Styles.servicesBox}>
                <center>
                    <h3>Connect your services</h3>
                </center>
                <Row>
                    <Col span={12} offset={6}>
                        <Row gutter={16}>
                            <TwitterCard isActive={this.state.twitter} socket={socket} email={this.state.user.email} provider="twitter" getServiceAdded={this.getServiceAdded} />
                            <FacebookCard isActive={this.state.facebook} getServiceAdded={this.getServiceAdded} />
                            <OfficeCard isActive={this.state.outlook} socket={socket} email={this.state.user.email} provider="outlook" getServiceAdded={this.getServiceAdded} />
                            <TrelloCard isActive={this.state.trello} socket={socket} email={this.state.user.email} provider="trello" getServiceAdded={this.getServiceAdded} />
                            <InstagramCard isActive={this.state.instagram} socket={socket} email={this.state.user.email} provider="instagram" getServiceAdded={this.getServiceAdded} />
                            <SpotifyCard isActive={this.state.spotify} socket={socket} email={this.state.user.email} provider="spotify" getServiceAdded={this.getServiceAdded} />
                        </Row>
                        <center>
                            <Button type="primary" onClick={this.offAllServices}
                                className={Styles.btnDisconnect}>Disconnect all services</Button>
                        </center>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(withRouter(ServicesLayout)) 