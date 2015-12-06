import React from 'react';
import ReactDom from 'react-dom';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Timer from './Timer';
import Info from './Info';
import InstaUser from './InstaUser';
import Login from '../Login';
import UserDataSwitch from './UserDataSwitch';

class Dashboard extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      userName: '',
      dialogVisible: false,
      userData: this.props.userData,
      userNum: 0,
    };
    [
      'onClose',
      'loginEnd',
      'addUser',
      'setNumFunc',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  componentDidUpdate() {
    //console.log(window.UserData);

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      userData: nextProps.userData,
      dialogVisible: false,
    })
  }

  onClose() {
    this.setState({
      dialogVisible: false
    });
  }

  loginEnd(data) {
    this.setState({
      dialogVisible: false
    });
    this.props.callback();
  }

  addUser() {
    this.setState({
      dialogVisible: true
    });
  }

  setNumFunc(num) {
    this.setState({
      userNum: num
    })
  }

  render() {
    let dialog;
    const userData = this.state.userData;
    if (this.state.dialogVisible) {
      dialog = <Login
        key='login'
        visible={this.state.dialogVisible}
        onClose={this.onClose}
        activeKey={this.state.loginDefaultActiveKey}
        loginEnd={this.loginEnd}
        sign={false}
        userData={userData}
      />
    }
    console.log(userData)
    const liks = userData.user_detail.accounts ? userData.user_detail.accounts[this.state.userNum].follows || 0 : 0,
      commentes = userData.user_detail.accounts ? userData.user_detail.accounts[this.state.userNum].medias || 0 : 0;
    return <div className="dashboard">
      <Row type="flex" justify="space-between">
        <Col className='content-wap' span="7">
          <Timer userData={userData.user_detail}/>
        </Col>
        <Col className='content-wap' span="7">
          <Info likes={liks} commentes={commentes}/>
        </Col>
        <Col className='content-wap' span="7">
          <InstaUser onClick={this.addUser} userData={userData.user_detail} setNumFunc={this.setNumFunc}/>
        {dialog}
        </Col>
      </Row>
      <Row type="flex" justify="space-between" className='user-switch'>
        <Col className='content-wap' span="7">
          <UserDataSwitch userData={userData.user_detail} userNum={this.state.userNum} title='tag' type='tags' prefixCls='tags' switch={true}/>
        </Col>
        <Col className='content-wap' span="7">
          <UserDataSwitch userData={userData.user_detail} userNum={this.state.userNum} title='location' type='locations' prefixCls='locations' switch={true}/>
        </Col>
        <Col className='content-wap' span="7">
          <UserDataSwitch userData={userData.user_detail} userNum={this.state.userNum} title='user' type='users' prefixCls='users' switch={true}/>
        </Col>
      </Row>
      <div className='user-comments '>
        <p>Edit your comments</p>
        <div className='content-wap'>
          <UserDataSwitch userData={userData.user_detail} userNum={this.state.userNum} title='comment' type='comments' prefixCls='comments'/>
        </div>
      </div>
    </div>
  }
}
Dashboard.propTypes = {
  userData: React.PropTypes.object,
  callback: React.PropTypes.func
};

Dashboard.defaultProps = {
  callback: ()=> {
  },
  userData: null,
};
export default Dashboard;