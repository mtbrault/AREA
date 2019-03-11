import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { Layout } from 'antd';

import Header from './header';
import ServicesLayout from './servicesLayout';
import ActionLayout from './actionLayout';
import ReactionLayout from './reactionLayout';
import Styles from './mainLayout.less';

const { Content } = Layout;


class MainLayout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { data: {} }
  }

  componentDidMount() {
    if (!this.props.auth.isLogged) {
      this.props.history.push('/auth/login');
    }
  }

  render() {
    return (
      <Layout className={Styles.mainBlock}>
        <Header />
        <Layout>
          <Layout className={Styles.contentBlock}>
            <Content className={Styles.contentItem}>
              <Switch>
                <Route path="/services" component={ServicesLayout} />
                <Route exact path="/" render={() => <Redirect to={'/services'} />} />
                <Route exact path="/actions" render={() => <Redirect to="/home" />} />
                <Route path="/actions/:service" component={ActionLayout} />} />
                <Route exact path="/reactions" render={() => <Redirect to="/home" />} />
                <Route path="/reactions/:service/:id" component={ReactionLayout} />} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>);
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(withRouter(MainLayout)) 