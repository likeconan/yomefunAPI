import Router from 'react-router/lib/Router';
import Route from 'react-router/lib/Route';
import browserHistory from 'react-router/lib/browserHistory';
import React from 'react'
import ReactDOM from 'react-dom';
import pages from './pages';
import store from './store';
import { Provider } from 'react-redux';

require('antd/dist/antd.less')

require('./pages/styles/layout-page.less')


ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route breadcrumbName='首页' component={pages.LayoutPage}>
                <Route path='/' component={pages.HomePage} />
                <Route breadcrumbName='组织教育架构'>
                    <Route path='/organization' breadcrumbName='机构管理' component={pages.OrganizationPage} />
                </Route>
                <Route breadcrumbName='家长'>
                    <Route path='/parent' breadcrumbName='家长管理' component={pages.ParentPage} />
                </Route>
                <Route breadcrumbName='学生'>
                    <Route path='/student' breadcrumbName='学生管理' component={pages.StudentPage} />
                </Route>
                <Route breadcrumbName="管家">
                    <Route path="/housekeeper" breadcrumbName="管家管理" component={pages.Housekeeper}></Route>
                </Route>
                <Route path='/login' component={pages.LoginPage} />
            </Route>
        </Router>
    </Provider>, document.getElementById('root'));