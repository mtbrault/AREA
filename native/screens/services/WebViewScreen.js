import React, { Component } from 'react';

import { View, WebView } from 'react-native';
import API_URL from '../../config/uri';
import { withNavigation } from 'react-navigation'

class WebViewScreen extends Component {
    constructor(props) {
        super(props)
        console.log(this.props.navigation.state)
    }

    componentDidMount() {
        console.log(this.props.navigation.state)
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <WebView source={{ uri: `${API_URL}/trello?socketId=qsdqsdqsdqsdqsdq&email=zakaria.laabid@epitech.eu` }}
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
        console.log(webViewState)
    }


}

export default withNavigation(WebViewScreen);
