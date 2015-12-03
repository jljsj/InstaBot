import React from 'react';
import { findDOMNode } from 'react-dom';
import { Row, Col } from 'antd/lib/layout';
import QueueAnim from 'rc-queue-anim';
import { toMoney } from '../utils';
import Message from '../Message';
require('gsap-react-plugin');

const Community = React.createClass({

  getInitialState() {
    return {
      love: 0,
      chat: 0,
      user: 0
    }
  },

  componentWillMount() {
    $.ajax({
      type: 'POST',
      url: 'http://139.162.27.27:8080/statistics',
      data: '',
      success: (data)=> {
        if (data.code === '200') {
          this.data={
            love: data.site_statistics.totalLikes,
            chat: data.site_statistics.totalComments,
            user: data.site_statistics.totalFollows
          }
        }
        const m = Message.success({content: data.msg});
        setTimeout(()=> {
          const _comp = m.component;
          if (!_comp.state.children.length) {
            m.remove();
          }
        }, 3000);
      },
      error: ()=> {
        const m = Message.success({content: data.msg});
        setTimeout(()=> {
          const _comp = m.component;
          if (!_comp.state.children.length) {
            m.remove();
          }
        }, 3000);
      }
    });
  },

  componentDidUpdate() {
    if (this.props.scrollShow && !this.show) {
      setTimeout(()=> {
        TweenMax.to(this, .8, {
          state: {love: this.data.love, chat: this.data.chat, user: this.data.user}
        })
      }, 500);//queueAnim delay 300;
      this.show = true
    }
  },

  render() {
    return <div {...this.props} >
      <QueueAnim className='community' type='bottom' leaveReverse={true}>
        {!this.props.scrollShow ? null : [<h3 key='h4'>COMMUNITY DATA</h3>,
          <p key='p'>We grow fast, and help you gain real likes and followers rapidly.</p>,
          <div className='line' key='line'></div>,
          <Row className='comm-img-wap' key='row'>
            <QueueAnim type='bottom'>
              <Col span='8' key='1'>
                <div className='comm-img'>
                  <img src='/images/love.png' width='100%' />
                </div>
                <span className='comm-love-text' ref='love'>{toMoney(this.state.love)}</span>
                <h4>HEARTS SENT</h4>
              </Col>
              <Col span='8' key='2'>
                <div className='comm-img'>
                  <img src='/images/chat.png' width='100%' />
                </div>
                <span className='comm-chat-text' ref='chat'>{toMoney(this.state.chat)}</span>
                <h4>COMMENTS SENT</h4>
              </Col>
              <Col span='8' key='3'>
                <div className='comm-img'>
                  <img src='/images/user.png' width='100%' />
                </div>
                <span className='comm-user-text' ref='user'>{toMoney(this.state.user)}</span>
                <h4>FOLLOWERS GAINED</h4>
              </Col>
            </QueueAnim>
          </Row>]}
      </QueueAnim>
    </div>;
  },
});

export default Community;