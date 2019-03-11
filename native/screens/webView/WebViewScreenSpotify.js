import React, { Component } from 'react';

import { View, WebView } from 'react-native';
import API_URL from '../../config/uri';
import { withNavigation } from 'react-navigation'
import io from 'socket.io-client';

const socket = new io(API_URL);
class WebViewScrenSpotify extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <WebView source={{ uri: `${API_URL}/spotify?socketId=${socket.id}&email=zakaria.laabid@epitech.eu` }}
                    startInLoadingState={true}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    automaticallyAdjustContentInsets={false}
                    style={{ marginTop: 20 }}
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)} />
            </View>
        );
    }

    _onNavigationStateChange = async (webViewState) => {
        console.log(webViewState.url);
        if (webViewState.url.startsWith('http://localhost:8080/spotify/callback')) {
            socket.on('spotify', user => {
                console.log(user);
            })
            this.props.navigation.navigate('Home');
        }

    }


}

export default withNavigation(WebViewScrenSpotify);
