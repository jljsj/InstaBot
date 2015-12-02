import React from 'react';
import { Row, Col } from 'antd/lib/layout';
import './Footer.less';

const Footer = React.createClass({
  render() {
    return <footer >
      <div className='footer-wap'>
        <div className='line'></div>
        <p>Copyright © 2015 App Kitchen LLC. Handcrafted by a bunch of people who love Instagram.</p>
        <Row className='icon-wap' type="flex" justify="space-around">
          <Col span="4">
            <a href="#" target="_blank" >
              <img src="/images/IG.png"  width="100%" />
            </a>
          </Col>
          <Col span="4">
            <a href="#" target="_blank" >
              <img src="/images/facebook.png"  width="100%" />
            </a>
          </Col>
          <Col span="4">
            <a href="#" target="_blank" >
              <img src="/images/twitter.png"  width="100%" />
            </a>
          </Col>
          <Col span="4">
            <a href="#" target="_blank" >
              <img src="/images/email.png"  width="100%" />
            </a>
          </Col>
        </Row>
      </div>
    </footer>;
  }
});

export default Footer;