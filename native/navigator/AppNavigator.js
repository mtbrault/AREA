import React from 'react';

import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import Icon from "react-native-vector-icons/AntDesign";

import Colors from '../constants/Colors';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/login/LoginScreen';
import RegisterScreen from '../screens/register/RegisterScreen'
import SettingScreen from '../screens/SettingsScreen';
import ProfilScreen from '../screens/profil/ProfilScreen';
import ActionScreen from '../screens/actions/ActionScreen'

import WebViewScreenTrello from '../screens/webView/WebViewScreenTrello'
import WebViewScreenInstagram from '../screens/webView/WebViewScreenInstagram'
import WebViewScreenTwitter from '../screens/webView/WebViewScreenTwitter'
import WebViewScreenSpotify from '../screens/webView/WebViewScreenSpotify'
import WebViewScreenOutlook from '../screens/webView/WebViewScreenOutlook'

import TrelloService from '../screens/services/trelloServices';
import SpotifyService from '../screens/services/spotifyService';
import OutlookService from '../screens/services/outlookService';
import TwitterService from '../screens/services/twitterService';
import InstagramService from '../screens/services/instagramService';

const LoginScreenStack = createStackNavigator(
    {
        LoginScreen: LoginScreen,
    },
    {
        headerMode: 'none'
    }
)

const TrelloServiceStack = createStackNavigator(
    {
        TrelloService: TrelloService,
    },
    {
        headerMode: 'none'
    }
)

const SpotifyServiceStack = createStackNavigator(
    {
        SpotifyService: SpotifyService,
    },
    {
        headerMode: 'none'
    }
)

const OutlookServiceStack = createStackNavigator(
    {
        OutlookService: OutlookService,
    },
    {
        headerMode: 'none'
    }
)

const TwitterServiceStack = createStackNavigator(
    {
        TwitterService: TwitterService,
    },
    {
        headerMode: 'none'
    }
)

const InstagramServiceStack = createStackNavigator(
    {
        InstagramService: InstagramService,
    },
    {
        headerMode: 'none'
    }
)

const WebViewScreenTrelloStack = createStackNavigator(
    {
        WebViewScreenTrello: WebViewScreenTrello,
    },
    {
        headerMode: 'none'
    }
)

const WebViewScreenTwitterStack = createStackNavigator(
    {
        WebViewScreenTwitter: WebViewScreenTwitter,
    },
    {
        headerMode: 'none'
    }
)

const WebViewScreenSpotifyStack = createStackNavigator(
    {
        WebViewScreenSpotify: WebViewScreenSpotify,
    },
    {
        headerMode: 'none'
    }
)

const WebViewScreenInstagramStack = createStackNavigator(
    {
        WebViewScreenInstagram: WebViewScreenInstagram,
    },
    {
        headerMode: 'none'
    }
)

const WebViewScreenOutlookStack = createStackNavigator(
    {
        WebViewScreenOutlook: WebViewScreenOutlook,
    },
    {
        headerMode: 'none'
    }
)

const RegisterScreenStack = createStackNavigator(
    {
        RegisterScreen: RegisterScreen
    },
    {
        headerMode: 'none'
    }
)

const HomeScreenStack = createStackNavigator(
    {
        HomeScreen: HomeScreen
    },
    {
        headerMode: 'none'
    }
)

const LoginTab = createBottomTabNavigator({
    Login: {
        screen: LoginScreenStack,
        navigationOptions: {
            tabBarLabel: 'Connexion',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="login" color={tintColor} size={24} />
            )
        }
    },
    Register: {
        screen: RegisterScreenStack,
        navigationOptions: {
            tabBarLabel: 'Inscription',
            tabBarIcon: ({ tintColor }) => (
                <Icon name="form" color={tintColor} size={24} />
            )
        }
    }
}, {
        tabBarOptions: {
            activeTintColor: Colors.tintColor,
            inactiveTintColor: '#b3b4b8',
            labelStyle: {
                fontSize: 10,
            },
            style: {
                backgroundColor: '#222327',
                borderTopWidth: 0,
                borderTopColor: 'black',
                borderTopWidth: 1,
                shadowOffset: { width: 10, height: 10 },
                shadowColor: 'black',
                shadowOpacity: 1,
                elevation: 5
            }
        }
    })

const Tab = createStackNavigator({
    Home: {
        screen: HomeScreenStack,
        navigationOptions: {
            title: 'Home'
        }
    },
    Actions: {
        screen: ActionScreen,
        navigationOptions: {
            title: 'Actions'
        }
    }
})

const SwitchNav = createSwitchNavigator(
    {
        TabLogin: {
            screen: LoginTab,
            navigationOptions: {
                tabBarLabel: 'Login Page'
            }
        },
        TabEpicture: {
            screen: Tab,
            navigationOptions: {
                tabBarLabel: 'TabList Page'
            }
        },
        WebViewScreenTrello: {
            screen: WebViewScreenTrelloStack,
            navigationOptions: {
                tabBarLabel: 'WebViewScreenTrello Page'
            }
        },
        WebViewScreenInstagram: {
            screen: WebViewScreenInstagramStack,
            navigationOptions: {
                tabBarLabel: 'WebViewScreenInstagram Page'
            }
        },
        WebViewScreenTwitter: {
            screen: WebViewScreenTwitterStack,
            navigationOptions: {
                tabBarLabel: 'WebViewScreenTwitter Page'
            }
        },
        WebViewScreenSpotify: {
            screen: WebViewScreenSpotifyStack,
            navigationOptions: {
                tabBarLabel: 'WebViewScreenSpotify Page'
            }
        },
        WebViewScreenOutlook: {
            screen: WebViewScreenOutlookStack,
            navigationOptions: {
                tabBarLabel: 'WebViewScreenOutlook Page'
            }
        },
        TrelloService: {
            screen: TrelloServiceStack,
            navigationOptions: {
                tabBarLabel: 'Trello Service'
            }
        },
        TwitterService: {
            screen: TwitterServiceStack,
            navigationOptions: {
                tabBarLabel: 'Twitter Service'
            }
        },
        OutlookService: {
            screen: OutlookServiceStack,
            navigationOptions: {
                tabBarLabel: 'Outlook Service'
            }
        },
        SpotifyService: {
            screen: SpotifyServiceStack,
            navigationOptions: {
                tabBarLabel: 'Spotify Service'
            }
        },
        InstagramService: {
            screen: InstagramServiceStack,
            navigationOptions: {
                tabBarLabel: 'Instagram Service'
            }
        }

    },
    {
        initialRouteName: 'TabLogin',
    }
)

export default SwitchNav;