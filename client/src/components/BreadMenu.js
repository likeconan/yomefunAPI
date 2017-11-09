import React, { Component } from 'react';
import Link from 'react-router/lib/Link';
import { Breadcrumb } from 'antd';

require('./styles/bread-menu.less')

class BreadMenu extends Component {
    render() {
        const { routes } = this.props
        return (
            <div className='bread-menu-con padding-left-20px padding-tb-20'>
                <Breadcrumb routes={routes}>
                </Breadcrumb>
            </div>
        );
    }
}

export default BreadMenu;