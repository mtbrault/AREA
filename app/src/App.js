import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

import store from './redux/store';
import persistor from './redux/persistStore';
import enUS from 'antd/lib/locale-provider/en_US';
import Login from './view/auth/login';
import Register from './view/auth/register';
import MainLayout from './view/main/mainLayout';
import createBrowserHistory from "history/createBrowserHistory";
import setAuthToken from './redux/auth/setAuthToken';
import { logoutUser, setCurrentUser } from './redux/auth/action';


import jwt_decode from 'jwt-decode';

import './index.css';

const history = createBrowserHistory()

if (localStorage.areaToken) {
  const decoded = jwt_decode(localStorage.areaToken);
  store.dispatch(setCurrentUser(decoded));
  setAuthToken(localStorage.areaToken);

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser(), history);
    window.location.href = '/auth/login'
  }
}


class App extends Component {

  render() {
    return (
      <LocaleProvider locale={enUS}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Router history={history}>
              <Switch>
                <Route exact path="/auth/login" component={Login} />
                <Route exact path="/auth/register" component={Register} />
                <Route path="/" component={MainLayout} />
              </Switch>
            </Router>
          </PersistGate>
        </Provider>
      </LocaleProvider>
    );
  }
}

export default App;
