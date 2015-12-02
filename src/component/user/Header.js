import React from 'react';
import ReactDom from 'react-dom';
const ReactRouter = require('react-router');
let { Router, Route, Link } = ReactRouter;
import Menu from 'antd/lib/menu';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';


class Header extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {}
  }

  LoginOut() {
    $.cookie('InstaBot', '', {expires: -1, path: '/', secure: true});
    location.href = '/';
  }

  render() {
    const menu = <Menu>
      <Menu.Item key="0">
        <a onClick={this.LoginOut.bind(this)}>Login out</a>
      </Menu.Item>
    </Menu>;
    const phoneMenu = <Menu>
      <Menu.Item>
        <Link to="/dashboard">Dashboard</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to="/pricing">Pricing</Link>
      </Menu.Item>
      <Menu.Item className='user-header-phone-name'>
        <p>user name</p>
        <p>{this.props.userName}</p>
      </Menu.Item>
      <Menu.Item className='user-header-phone-login-out'>
        <a onClick={this.LoginOut.bind(this)}>Login out</a>
      </Menu.Item>
    </Menu>;

    return <header className='user-header'>
      <div className='user-header-logo'>
        <span></span>
        <p>InstaBot</p>
      </div>
      <Menu style={{marginBottom: 10}} mode="horizontal" selectedKeys={this.props.selectedKeys}>
        <Menu.Item key="dashboard">
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="pricing">
          <Link to="/pricing">Pricing</Link>
        </Menu.Item>
      </Menu>
      <div className='user-header-userName'>
        <Dropdown overlay={menu} trigger={["click"]} prefixCls='user-header-login'>
          <div>{this.props.userName}
            <Icon type="caret-down" />
          </div>
        </Dropdown>
      </div>
      <Dropdown overlay={phoneMenu} prefixCls='user-header-phone' trigger={['click']}>
        <div className='user-header-phone-menu-icon'><i></i></div>
      </Dropdown>
    </header>
  }
}

Header.propTypes = {
  selectedKeys: React.PropTypes.array,
  userName: React.PropTypes.string,
};

Header.defaultProps = {
  selectedKeys: [],
  userName: 'loading'
};

export default Header;
