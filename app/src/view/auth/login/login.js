import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Layout, Alert } from 'antd';
import { loginUser } from '../../../redux/auth/action';
import { connect } from 'react-redux';

import isEmpty from '../../../redux/isEmpty';
import Styles from './login.less';

class Login extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            error: null
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.error != null) {
            this.setState({
                error: null
            })
        }
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        if (isEmpty(user.email)) {
            this.setState({ error: 'Please enter an email' })
        } else if (isEmpty(user.password)) {
            this.setState({ error: 'Please enter a password' })
        } else {
            this.props.loginUser(user, this.props.history);
        }
    }

    componentDidMount() {

        if (this.props.auth.isLogged) {
            this.props.history.push('/services');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.error != null) {
            this.setState({
                error: nextProps.auth.error
            })
        }
    }

    render() {
        return (
            <Layout className={Styles.loginBox}>
                <img src="https://gitlab.com/uploads/-/system/project/avatar/10451634/8b044d06f90477cfbf39ca4a5c6c541c-snowflake-flat-icon-5-by-vexels.png?width=48" alt="" width="100" />
                <h2 className={Styles.titleForm}>Login</h2>
                <Form onSubmit={this.handleSubmit} className={Styles.loginForm}>
                    {this.state.error && <Alert type="error" message={this.state.error} showIcon />}
                    <Form.Item>
                        <label>Your email</label>
                        <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" id="user_email" name="email"
                            onChange={this.handleInputChange} value={this.state.email} />
                    </Form.Item>
                    <Form.Item>
                        <label>Your password</label>
                        <Input.Password prefix={<Icon type="lock" theme="filled" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" id="user_password" name="password"
                            onChange={this.handleInputChange} value={this.state.password} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className={Styles.buttonForm}>Login</Button>
                    </Form.Item>
                </Form>
                <Link to="/auth/register" className={Styles.buttonText}><span >Create an account</span></Link>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { loginUser })(withRouter(Login)) 