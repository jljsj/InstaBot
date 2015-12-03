import '../common/lib.js';
import './user.less';
import React from 'react';
import ReactDom from 'react-dom';
import Header from '../component/user/Header';
const ReactRouter = require('react-router');
let { Router, Route, Link } = ReactRouter;
import Pricing from '../component/user/Pricing';
import Dashboard from '../component/user/Dashboard';
import QueueAnim from 'antd/lib/queue-anim';
import Icon from 'antd/lib/icon';
import Footer from '../component/user/Footer';

class App extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      userData: null,
    }
  }

  componentWillMount() {
    let cookie = $.cookie('InstaBot');
    if (!cookie) {
      return location.href = '/';
    }
    const _data = JSON.parse(cookie);
    if (_data.uid && _data.session) {
      $.ajax({
        type: 'POST',
        url: 'http://139.162.27.27:8080/detail',
        data: _data,
        success: (data)=> {
          if (data.code === '200') {
            this.setState({
              userName: data.user_detail.name,
              userData: data,
            })
          } else {
            location.href = '/';
          }
        },
        error: ()=> {
          return location.href = '/';
        }
      });
    }
  }

  RefreshData() {
    this.componentWillMount();
  }

  render() {
    const key = this.props.location.pathname;
    const keys = key.replace('/', '') ? [key.replace('/', '')] : ['dashboard'];

    return this.state.userData ? <div>
      <Header selectedKeys={keys} userName = {this.state.userName}/>
      <QueueAnim type={'bottom'} className="user-router-wrap" duration={600}>
          {React.cloneElement(this.props.children || <Dashboard/>, {
            key: key,
            userData: this.state.userData,
            callback: this.RefreshData.bind(this),
          })}
      </QueueAnim>
      <Footer />
    </div> : <div className='page-load'>
      <Icon type="loading" />
    </div>
  }
}


ReactDom.render(<Router>
  <Route path="/" component={App} ignoreScrollBehavior>
    <Route path="dashboard" component={Dashboard} />
    <Route path="pricing" component={Pricing} />
  </Route>
</Router>, document.getElementById('react-content'));
