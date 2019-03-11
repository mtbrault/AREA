import React, { PureComponent } from 'react'
import { Layout, Menu, Button, Row, Col } from 'antd';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../../../redux/auth/action';
import { connect } from 'react-redux';

import Styles from './header.less';

class Header extends PureComponent {
    render() {
        return (
            <Layout className={Styles.headerBackground} >
                <Row>
                    <Col span={18} push={6}>
                        <Menu
                            theme="light"
                            mode="horizontal"
                            className={Styles.menuBlock}>
                            <Menu.Item key="1" className={Styles.menuItem}>
                                <Button className={Styles.menuButton} onClick={() => this.props.logoutUser(this.props.history)}>
                                    Deconnexion
                                </Button>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span={2} pull={18} className={Styles.headerLogoBlock}>
                        <span className={Styles.clickable} onClick={() => this.props.history.push("/services")}>AREA</span>
                    </Col>
                </Row>
            </Layout>
        )
    }
}

export default connect(null, { logoutUser })(withRouter(Header)) 