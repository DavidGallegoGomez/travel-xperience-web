import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import authService from '../../services/AuthService'
import { Form, Icon, Input, Button } from 'antd';

class NormalLoginForm extends Component {
  state = { isAuthenticated: false }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isAuthenticated } = this.state;

    if (!isAuthenticated) {
      return ( <Redirect to="/profile" /> );
    }

    return (
      <Form onSubmit={this.handleSubmit} className="login-form" style={{ maxWidth: '300' }}>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [ { required: true, message: 'Please input your Username!' } ],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [ { required: true, message: 'Please input your Password!' } ],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          {/* Or <Link to="/register">register now!</Link> */}
          Or register now!
        </Form.Item>
      </Form>
    );
  }
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default Login;
