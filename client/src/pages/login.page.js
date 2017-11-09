import React, { Component } from 'react';
import LoginForm from '../containers/LoginForm';

require('./styles/login-page.less')

class LoginPage extends Component {
    render() {
        return (
            <div className='login-page all-center-flex back-img-cover'>
                <div className='login-con'>
                    <h1 className='margin-tb-20 white-text'>YomeFun后台管理系统</h1>
                    <LoginForm />
                </div>
            </div>
        );
    }
}

export default LoginPage;