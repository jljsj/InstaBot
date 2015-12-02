import React from 'react';
import { Row, Col } from 'antd/lib/layout';
import Pay from '../Pay';
import Button from 'antd/lib/Button';
import QueueAnim from 'rc-queue-anim';

const Pricing = React.createClass({
  render() {
    return <div {...this.props}>
      <QueueAnim className='pricing' type='bottom' leaveReverse={true}>
      {!this.props.scrollShow ? null : [<h3 key='h4'>PRICING</h3>,
        <p key='p'>Everyone get 3-Days free trial, much cheap than other similar product.</p>,
        <div className="line" key='line'></div>,
        <Row className ='pricing-pay' key='row'>
          <QueueAnim type='bottom'>
            <Col span='8' key='1'>
              <Pay className='blue' bottom={false}/>
            </Col>
            <Col span='8' key='2'>
              <Pay title='Popular' days='30' money='4.99' pre='0.16' comments='30' endText={{
                text: 'Up to',
                text2: 'Instagram accounts',
                number: 3
              }} bottom={false} className='green'/>
            </Col>
            <Col span='8' key='3'>
              <Pay title='Pro' days='90' money='12.99' pre='0.14' comments='100' endText={{
                text: 'Up to',
                text2: 'Instagram accounts',
                number: 6
              }} bottom={false} className='Purple'/>
            </Col>
          </QueueAnim>
        </Row>,
        <div className='bottom-btn-wap' key='button'>
          <Button className='blue-button'>GET 3-DAYS FREE TRIAL</Button>
        </div>]}
      </QueueAnim>

    </div>;
  },
});

export default Pricing;