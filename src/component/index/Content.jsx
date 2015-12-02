import './index.less';
import React from 'react';
import { Row, Col } from 'antd/lib/layout';
import QueueAnim from 'rc-queue-anim';

const Content = React.createClass({
  render() {
    return <div {...this.props}>
      <QueueAnim className='content' type='bottom' leaveReverse={true}>
      {!this.props.scrollShow ? null : [<h3 key='h3'>HOW IT WORKS</h3>,
        < p key='p'>Instabot is a powerful bot help you auto-like and auto-comment on
          any instagram photos, then gain similar people’s likes or a follow.</p>,
        <div className='line' key='lien'></div>,
        <Row className='how-img-wap' key='row'>
          <QueueAnim type='bottom'>
            <Col span="8" key='0'>
              <div className="how-img-box">
                <img src="/images/reviews.png" width="100%"/>
              </div>
              <h3 className="how-img-box">Edit your comments first</h3>
              <p className="how-img-box">You should setup your comments first, nice words
                would encourage them check out your profile.
                Yeah, you can set it as your Ads slogan or something.</p>
            </Col>

            <Col span="8" key='1'>
              <div className="how-img-box">
                <img src="/images/switch.png" width="100%"/>
              </div>
              <h3 className="how-img-box">Auto-like & Auto-comment</h3>
              <p className="how-img-box">Automatically like and comment works on
                Hastags, locations and users you add.
                <br/>
                Really fast and impact.</p>
            </Col>
            <Col span="8" key='2'>
              <div className="how-img-box">
                <img src="/images/instagram.png" width="100%"/>
              </div>
              <h3 className="how-img-box">Get real likes and follows back</h3>
              <p className="how-img-box">Magic time is coming. You well get a ton of thank you
                back comment, they’ll check out your profile, if liked,
                you'll get a lot of likes and follow you immediately.</p>
            </Col>
          </QueueAnim>
        </Row>]
        }
      </QueueAnim>
    </div>;
  }
});

export default Content;
