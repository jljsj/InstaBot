import React from 'react';
import ReactDOM from 'react-dom';
import Icon from 'antd/lib/icon';
import {createChainedFunction} from 'rc-util';

class InstaSelect extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      userData: this.props.userData,
      userNum: this.props.userNum,
    };
    this.dropdown = null;
    this.timeout = null;
    this.overTimeout = null;
    [
      'onMouseEnter',
      'onMouseLeave',
      'mouseLeave',
      'mouseEnter',
      'listOver',
      'listOut',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  getDialogContainer() {
    if (!this.dropdownContainer) {
      const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
      const left = rect.left;
      const top = rect.top + rect.height;
      this.dropdownContainer = document.createElement('div');
      this.dropdownContainer.style.width = rect.width + 'px';
      this.dropdownContainer.style.left = left + 'px';
      this.dropdownContainer.style.top = top + document.body.scrollTop + 'px';
      document.body.appendChild(this.dropdownContainer);
    }
    this.dropdownContainer.className = `${this.props.prefixCls}-container`;
    return this.dropdownContainer;
  }

  getDropdown() {
    const container = <div className="instauser-drop" onMouseEnter={this.listOver} onMouseLeave={this.listOut}>
    {this.state.userData.accounts.map((data, i)=> {
      if (i === this.state.userNum) {
        return null;
      }
      return <div className="instauser" key={i} onClick={this.listClick.bind(this, i)}>
        <ul>
          <li className='instauser-img glyph' style={{backgroundImage: data.profilePicture}}></li>
          <li className='instauser-add-text'>{data.username}</li>
        </ul>
      </div>
    })}
      <div className="instauser" key='add' onClick={this.props.onClick}>
        <ul>
          <li className='instauser-img glyph'></li>
          <li className='instauser-add-text'>Add new instagram account</li>
        </ul>
      </div>
    </div>;
    return container;
  }

  listClick(i) {
    this.mouseLeave();
    this.props.setNumFunc(i);
  }

  mouseLeave() {
    this.dropdownContainer.className += ' instauser-container-close';
    this.timeout = setTimeout(()=> {
      ReactDOM.unmountComponentAtNode(this.getDialogContainer());
      document.body.removeChild(this.dropdownContainer);
      this.dropdownContainer = null;
    }, 450);
  }

  mouseEnter() {
    clearTimeout(this.timeout);
    clearTimeout(this.overTimeout);
    delete this.timeout;
    delete this.overTimeout;
    ReactDOM.unstable_renderSubtreeIntoContainer(this, this.getDropdown(), this.getDialogContainer());
  }

  listOver() {
    this.mouseEnter();
  }

  listOut() {
    this.overTimeout = setTimeout(this.mouseLeave, 30);
  }

  onMouseEnter() {
    this.mouseEnter();
  }

  onMouseLeave() {
    this.overTimeout = setTimeout(this.mouseLeave, 30);
  }

  render() {
    const userData = this.state.userData.accounts[this.state.userNum];
    const img = userData.profilePicture;
    return <div className='instauser' onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
      <ul>
        <li className='instauser-img glyph' style={{backgroundImage: img}}></li>
        <li className='instauser-user-text'>
          <p>{userData.username}
            <Icon type="caret-down" />
          </p>
          <div className="instauser-user-followers">
            <span className="number-text">{userData.followedBy}</span>
            <span className="text">Followers</span>
            <div className='user'>
              <i></i>
              <p>+111</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  }
}
InstaSelect.propTypes = {
  userData: React.PropTypes.object,
  userNum: React.PropTypes.number,
  prefixCls: React.PropTypes.string,
};

InstaSelect.defaultProps = {
  userData: null,
  userNum: 0,
  prefixCls: 'instauser',
};
export default InstaSelect;