import React from 'react';
import Login from '../Login';
import Button from 'antd/lib/button';
import QueueAnim from 'rc-queue-anim';
import Message from '../Message';

const App = React.createClass({
  getInitialState() {
    return {
      formData: {
        userName: undefined,
        password: undefined,
        agreement: undefined,
      },
      visible: false,
      loginDefaultActiveKey: 'up',
      userName: null,
    };
  },
  onClose() {
    this.setState({
      visible: false
    });
  },
  onLogin() {
    this.setState({
      visible: true,
      loginDefaultActiveKey: 'in',
    });
  },
  onSign() {
    this.setState({
      visible: true,
      loginDefaultActiveKey: 'up',
    })
  },
  loginEnd(data) {
    this.setState({
      visible: false,
      userName: data.user.name
    })
  },
  componentWillMount() {
    let cookie = $.cookie('InstaBot');
    if (!cookie) {
      return
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
              userName: data.user_detail.name
            })
          }else{
            $.cookie('InstaBot', '', {expires: -1, path: '/', secure: true});
          }
        },
        error: ()=> {
          const m = Message.success({content: 'Server connection error'});
          setTimeout(()=> {
            const _comp = m.component;
            if (!_comp.state.children.length) {
              m.remove();
            }
          }, 3000);
          this.Logout();
        }
      });
    }
  },
  Logout() {
    $.cookie('InstaBot', '', {expires: -1});
    this.setState({
      userName: null,
    })
  },
  animType(e) {
    if (e.key === 'logo') {
      return 'scaleBig';
    }
    return 'bottom';
  },
  animDuration(e) {
    if (e.key === 'logo') {
      return 300;
    }
    return 500;
  },
  render() {
    let dialog;
    if (this.state.visible) {
      dialog = <Login
        key='login'
        visible={this.state.visible}
        onClose={this.onClose}
        activeKey={this.state.loginDefaultActiveKey}
        loginEnd={this.loginEnd}
      />
    }
    return <div className='banner-wap'>
      <QueueAnim {...this.props} type={this.animType} duration={this.animDuration} interval={200}>
        <div className="logo" key='logo'>
          <span className="logo-img" key='img'></span>
          <span className="logo-text" key='text'></span>
        </div>
        <h1 key='h1'>Get Unlimited Real Followers Automatically</h1>
        <div className='button-wap' key='button'>
        {this.state.userName ? <div key='user' className="user-name">{this.state.userName} |
          <a href="/user/"> manag </a>
          |
          <a onClick={this.Logout}> logout </a>
        </div> : [<Button onClick={this.onSign} className='blue-button' key='sign'>Sign up</Button>,
          <p key='or'>OR</p>,
          <Button onClick={this.onLogin} className='green-button' key='login'>Login</Button>]}
        </div>
        <div className='macbook' key='mackbook'>
          <div>
            <img src="/images/macbook.png" width="100%"/>
          </div>
          <div className='website'>
            <img ref='website-img' src="images/InstaBot_Website.jpg" width="100%"/>
          </div>
        </div>
      </QueueAnim>
      {dialog}
    </div>;
  }
});

export default App;