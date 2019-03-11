import React, { Component } from 'react'
import { Card, Col } from 'antd';
import Styles from './spotifyCard.less';
import API_URL from '../../config/uri';
import { withRouter } from 'react-router-dom'

class SpotifyCard extends Component {
    state = {
        user: {},
        disabled: ''
    }

    componentDidMount() {
        const { socket, provider } = this.props
        socket.on(provider, user => {
            if (this.popup) {
                this.popup.close();
                this.props.getServiceAdded();
            }
        })
    }

    checkPopup() {
        const check = setInterval(() => {
            const { popup } = this
            if (!popup || popup.closed || popup.closed === undefined) {
                clearInterval(check)
                this.setState({ disabled: '' })
            }
        }, 1000)
    }

    openPopup() {
        const { socket, email, provider } = this.props
        const width = 600, height = 600
        const left = (window.innerWidth / 2) - (width / 2)
        const top = (window.innerHeight / 2) - (height / 2)
        const url = `${API_URL}/${provider}?socketId=${socket.id}&email=${email}`
        return window.open(url, '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, 
          scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
          height=${height}, top=${top}, left=${left}`
        )
    }

    startAuth = () => {
        if (!this.state.disabled) {
            this.popup = this.openPopup()
            this.checkPopup()
            this.setState({ disabled: 'disabled' })
        }
    }

    closeCard = () => {
        this.setState({ user: {} })
    }

    redirectToActions() {
        this.props.history.push('/actions/spotify')
    }

    render() {
        return (
            <div>
                <Col span={8} className={Styles.boxCol} onClick={this.props.isActive ? this.redirectToActions.bind(this) : this.startAuth}>
                    <Card bordered={false} className={Styles.boxCard} style={this.props.isActive ? { backgroundColor: '#00F252' } : { backgroundColor: 'rgba(0, 0, 0, 0.85)' }}>
                        <img src="https://assets.ifttt.com/images/channels/51464135/icons/on_color_large.png" alt="Spotify" title="Spotify" />
                        <span>Spotify</span>
                    </Card>
                </Col>
            </div>
        )
    }
}

export default withRouter(SpotifyCard);