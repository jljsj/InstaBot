import React from 'react';
import ReactDom from 'react-dom';
import Pay from '../Pay';
import QueueAnim from 'rc-queue-anim';
import { Row, Col } from 'antd/lib/layout';
import Button from 'antd/lib/button';

class Pricing extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      userName: 'loading',
    }
  }

  render() {
    return <div className='pricing'>
      <Row className ='pricing-pay' key='row'>
        <QueueAnim type='bottom'>
          <Col span='8' key='1'>
            <Pay className='blue' />
          </Col>
          <Col span='8' key='2'>
            <Pay title='Popular' days='30' money='4.99' pre='0.16' comments='30' endText={{
              text: 'Up to',
              text2: 'Instagram accounts',
              number: 3
            }} className='green'/>
          </Col>
          <Col span='8' key='3'>
            <Pay title='Pro' days='90' money='12.99' pre='0.14' comments='100' endText={{
              text: 'Up to',
              text2: 'Instagram accounts',
              number: 6
            }} className='Purple'/>
          </Col>
        </QueueAnim>
      </Row>
    </div>
  }
}
export default Pricing;