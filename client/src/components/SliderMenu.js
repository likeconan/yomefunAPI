import { Menu, Icon } from 'antd';
import React, { Component } from 'react';
import browserHistory from 'react-router/lib/browserHistory';
import storage from 'store2'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

require('./styles/slider-menu.less')

class SliderMenu extends Component {
    handleClick = (e) => {
        browserHistory.push(e.key)
    }

    _logout = () => {
        storage.local({ authorize: null })
        window.location.href = '/login'
    }

    render() {
        return (
            <div className='slider-menu'>
                <Menu
                    onClick={this.handleClick}
                    theme='dark'
                    defaultSelectedKeys={[this.props.defaultSelectedKey]}
                    defaultOpenKeys={[this.props.defaultOpenKeys]}
                    mode="inline"
                >
                    <SubMenu key="sub1" title={<span><Icon type="appstore" /><span>组织教育架构</span></span>}>
                        <Menu.Item key="organization">机构管理</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="team" /><span>家长</span></span>}>
                        <Menu.Item key="parent">家长管理</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub3" title={<span><Icon type="bell" /><span>学生</span></span>}>
                        <Menu.Item key="student">学生管理</Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" title={<span><Icon type="home" /><span>管家</span></span>}>
                        <Menu.Item key="housekeeper">管家管理</Menu.Item>
                    </SubMenu>
                </Menu>
                <div className='logout-con' onClick={this._logout}>
                    退出
                </div>
            </div >

        );
    }
}

export default SliderMenu