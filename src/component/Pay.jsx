import React from 'react';
import './Pay.less';
import Button from 'antd/lib/Button';

class Pay extends React.Component {
  constructor() {
    super(...arguments);
  }

  render() {
    let className = this.props.className ? this.props.className + ' pay' : 'pay';
    return <div {...this.props} className={className}>
      <div className='top'>
        <div className="days">
          <h1>{this.props.days}</h1>
          <span >/days</span>
        </div>
        <h4>{this.props.title}</h4>
        <h2>${this.props.money}</h2>
        <div className='pre'>${this.props.pre} Per day</div>
      </div>
      <div className='list'>
        <ul>
          <li>Auto-like</li>
          <li>Auto-comment</li>
          <li>Support Hastag</li>
          <li>Support location</li>
          <li>Support User</li>
          <li>Up to&nbsp;
            <b>{this.props.comments}</b>
          &nbsp;comments</li>
          <li className={this.props.endText.className}>
          {this.props.endText.text}&nbsp;
            <b>{this.props.endText.number}</b>
          &nbsp;{this.props.endText.text2}
          </li>
        </ul>
      </div>
    {this.props.bottom ?
      <div className='bottom'>
        <Button className='button' className='blue-button no-radius'>
          <img src="/images/paypal.png" width="45%"/>
        </Button>
      </div> : null}
    </div>;
  }
}

Pay.propTypes = {
  days: React.PropTypes.string,
  title: React.PropTypes.string,
  money: React.PropTypes.string,
  pre: React.PropTypes.string,
  comments: React.PropTypes.string,
  endText: React.PropTypes.object,
  bottom: React.PropTypes.bool
};

Pay.defaultProps = {
  days: '7',
  title: 'Basic',
  bottom: true,
  money: '1.99',
  pre: '0.28',
  comments: '10',
  endText: {text: 'Multiple Instagram accounts', number: '', text2: '', className: 'close'},
};

export default Pay;