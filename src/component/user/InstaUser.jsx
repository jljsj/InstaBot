import React from 'react';
import ReactDom from 'react-dom';
//import Select from 'antd/lib/select';
//const Option = Select.Option;
import InstaSelect from './InstaSelect';

class InstaUser extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      userData: this.props.userData,
    }
  }

  render() {
    //accounts={!!userData.user_detail.accounts}
    let childrenToRender;
    const userData = this.state.userData.accounts;
    if (userData) {
      childrenToRender = <InstaSelect {...this.props}/>;
    } else {
      childrenToRender = <div className='instauser' {...this.props}>
        <ul>
          <li className='instauser-img glyph'></li>
          <li className='instauser-add-text'>Add new instagram account</li>
        </ul>
      </div>;
    }
    return childrenToRender
  }
}
InstaUser.propTypes = {
  userData: React.PropTypes.object,
  userNum: React.PropTypes.number,
  setNumFunc: React.PropTypes.func
};

InstaUser.defaultProps = {
  userData: null,
  userNum: 0,
  setNumFunc: ()=>{}
};
export default InstaUser;