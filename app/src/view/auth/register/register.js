import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Form, Icon, Input, Button, Layout, Alert } from 'antd';
import { registerUser } from '../../../redux/auth/action';
import { connect } from 'react-redux';

import isEmpty from '../../../redux/isEmpty';
import Styles from './register.less';

class Register extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            repassword: '',
            username: '',
            error: null,
            validate: false
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
            username: this.state.username,
            password: this.state.password,
            repassword: this.state.repassword
        }
        if (isEmpty(user.email)) {
            this.setState({ error: 'Please enter an email' })
        } else if (isEmpty(user.username)) {
            this.setState({ error: 'Please enter an username' })
        } else if (isEmpty(user.password)) {
            this.setState({ error: 'Please enter a password' })
        } else if (user.password !== user.repassword) {
            this.setState({ error: 'Bad confirm password' })
        } else {
            this.props.registerUser(user);
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
        if (nextProps.auth.validate != null) {
            this.setState({
                validate: nextProps.auth.validate
            })
        }
    }

    render() {
        return (
            <Layout className={Styles.registerBox}>
                <img src="https://gitlab.com/uploads/-/system/project/avatar/10451634/8b044d06f90477cfbf39ca4a5c6c541c-snowflake-flat-icon-5-by-vexels.png?width=48" alt="" width="100" />
                <h2 className={Styles.titleForm}>Register</h2>
                <Form onSubmit={this.handleSubmit} className={Styles.registerForm}>
                    {this.state.error && this.state.error.length > 2 && <Alert type="error" message={this.state.error} showIcon />}
                    {this.state.validate && <Alert type="success" message={"Inscription reussi !"} />}
                    <Form.Item>
                        <label>Your email</label>
                        <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />} type="email" id="user_email" name="email"
                            onChange={this.handleInputChange} value={this.state.email} />
                    </Form.Item>
                    <Form.Item>
                        <label>Your username</label>
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} type="text" id="user_username" name="username"
                            onChange={this.handleInputChange} value={this.state.username} />
                    </Form.Item>
                    <Form.Item>
                        <label>Your password</label>
                        <Input.Password prefix={<Icon type="lock" theme="filled" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" id="user_password" name="password"
                            onChange={this.handleInputChange} value={this.state.password} />
                    </Form.Item>
                    <Form.Item>
                        <label>Confirm your password</label>
                        <Input.Password prefix={<Icon type="lock" theme="filled" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" id="user_repassword" name="repassword"
                            onChange={this.handleInputChange} value={this.state.repassword} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className={Styles.buttonForm}>register</Button>
                    </Form.Item>
                </Form>
                <Link to="/auth/login" className={Styles.buttonText}><span >I have an account</span></Link>
            </Layout>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { registerUser })(withRouter(Register)) 