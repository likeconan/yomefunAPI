import React, { Component } from 'react';
import { routeAuthorize } from '../utilities/routeAuthorize';
import SliderMenu from '../components/SliderMenu';
import BreadMenu from '../components/BreadMenu';
import Classnames from 'classnames';
import PathMenuEnum from '../models/path.slidermenu.enum';
import store from '../store'
import { authorize } from '../actions/user.auth.action'

class LayoutPage extends Component {
    componentWillMount() {
        authorize().then((res) => {
            store.dispatch(res)
            routeAuthorize(this.props.location.pathname)
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.location.pathname != this.props.location.pathname) {
            routeAuthorize(nextProps.location.pathname)
        }
    }


    render() {
        const path = this.props.location.pathname.substring(1)
        const active = path !== 'login'
        return (
            <div>
                {
                    active &&
                    <SliderMenu defaultSelectedKey={path} defaultOpenKeys={PathMenuEnum[path]} />
                }
                <div className={Classnames('right-con', { active: active })}>
                    {
                        (active && this.props.location.pathname !== '/') &&
                        <BreadMenu routes={this.props.routes} />
                    }
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default LayoutPage;