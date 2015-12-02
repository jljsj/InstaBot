import './Login.less';
import React, {createElement} from 'react';
import ReactDOM from 'react-dom';
import BotDialogWrap from './BotDialogWrap';
import Carousel from 'antd/lib/carousel';
import Tabs from 'antd/lib/tabs';
import SignForm from './SignForm';
import InstaForm from './InstaForm';

const TabPane = Tabs.TabPane;


class Login extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      imageString: 'Slide0',
      resetData: false,
      activeKey: this.props.activeKey,
      visible: this.props.visible,
    }
  }

  tabClick(activeKey) {
    this.setState({
      activeKey: activeKey,
      resetData: !this.state.resetData
    });
  }


  render() {
    const imageToRender = [];
    for (let i = 0; i < 4; i++) {
      const element = createElement('div', {
        key: 'img' + i,
        style: {background: 'url("/images/login_img/' + this.state.imageString + (i + 1) + '.png") center/cover'}
      });
      imageToRender.push(element);
    }

    return <BotDialogWrap visible={this.state.visible}
      animation="zoom"
      maskAnimation="fade"
      onClose={this.props.onClose}
      style={{width: 960, height: 530}}
      className='login-dialog' ref='dialog'>
      <Carousel autoplay={true} autoplaySpeed={5000}>
      {imageToRender}
      </Carousel>
      <a href="#" target="_blank" className="glyph" />
    {this.props.sign ?
      <Tabs activeKey={this.state.activeKey} onChange={this.tabClick.bind(this)} className='login-tabs'>
        <TabPane tab="SIGN IN" key="in" >
          <SignForm type='in' resetData={this.state.resetData} callback={this.props.loginEnd}/>
        </TabPane>
        <TabPane tab="SIGN UP" key="up">
          <SignForm type='up' resetData={this.state.resetData} callback={this.props.loginEnd}/>
        </TabPane>
      </Tabs>
      : <div className='login-insta'>
      <h1>Connect Instagram</h1>
      <InstaForm type='up' callback={this.props.loginEnd} isInsta={true} callback={this.props.loginEnd} userData={this.props.userData}/>
      <div className='login-insta-bottom'>
        <h3>Your account security is very important to us!</h3>
        <p>We will not store your password during this sign in process.</p>
        <p>We promise never post anything through your Instagram account.</p>
      </div>
    </div>}
    </BotDialogWrap>
  }
}
Login.propTypes = {
  sign: React.PropTypes.bool,
  activeKey: React.PropTypes.string,
  loginEnd: React.PropTypes.func,
  userData: React.PropTypes.object
};

Login.defaultProps = {
  sign: true,
  activeKey: 'in',
  loginEnd: ()=> {
  },
  userData: null,
};
export default Login;