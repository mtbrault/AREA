import React, { Component } from 'react'
import { Card, Col } from 'antd';
import Styles from './facebookCard.less';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import API_URL from '../../config/uri';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class FacebookCard extends Component {
    responseFacebook = (res) => {
        axios.post(`${API_URL}/setServiceToken`, { res, serviceName: 'facebook' }).then((res) => {
            this.props.getServiceAdded();
        }).catch((err) => {
            console.log(err);
        })
        console.log("qsdqssd");
    }

    redirectToActions() {
        this.props.history.push('/actions/facebook')
    }

    render() {
        return (
            <div>
                <FacebookLogin
                    appId="419607445514642"
                    callback={this.responseFacebook}
                    fields="name,email,picture"
                    scope="email,publish_pages,manage_pages,user_likes,publish_to_groups,user_photos,user_link,user_posts,user_events,pages_messaging_subscriptions,user_videos"
                    render={(renderProps) =>
                        (
                            <Col span={8} className={Styles.boxCol}>
                                <Card bordered={false} className={Styles.boxCard} onClick={this.props.isActive ? this.redirectToActions.bind(this) : renderProps.onClick} style={this.props.isActive ? { backgroundColor: 'rgb(59, 87, 157)' } : { backgroundColor: 'rgba(0, 0, 0, 0.85)' }}>
                                    <img src="https://assets.ifttt.com/images/channels/36996033/icons/on_color_large.png" alt="Facebook" title="Facebook" />
                                    <span>Facebook</span>
                                </Card>
                            </Col>
                        )}
                />
            </div>
        )
    }
}

export default withRouter(FacebookCard);