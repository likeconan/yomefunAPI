import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import browserHistory from 'react-router/lib/browserHistory';
import store from '../store';
import { login } from '../actions/user.auth.action';
const FormItem = Form.Item;

class NormalLoginForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                login(values).then((res) => {
                    store.dispatch(res)
                    browserHistory.push('/')
                })
            }

        });

    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem className='margin-tb-10'>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
                        )}
                </FormItem>
                <FormItem className='margin-tb-10'>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
                        )}
                </FormItem>
                <FormItem className='margin-tb-10'>
                    <Button type="primary"
                        htmlType="submit"
                        className="login-form-button width-100p">
                        登录
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const LoginForm = Form.create()(NormalLoginForm);

export default LoginForm