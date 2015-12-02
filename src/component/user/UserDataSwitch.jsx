import React from 'react';
import ReactDom from 'react-dom';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Animate from 'rc-animate';
import QueueAnim from 'rc-queue-anim';
import Switch from 'antd/lib/switch';
import Message from '../Message';

class UserDataSwitch extends React.Component {
  constructor() {
    super(...arguments);
    this.accounts = this.props.userData.accounts[this.props.userNum];

    this.state = {
      addShow: false,
      value: '',
      listChildren: this.accounts[this.props.type] || [],
      listQueueType: 'bottom'
    };
    [
      'titleChange',
      'addClick',
      'likeChange',
      'commentChange',
    ].forEach((method) => this[method] = this[method].bind(this));
  }

  switchAjax(url, _data, callback) {
    $.ajax({
      type: 'POST',
      url: 'http://139.162.27.27:8080/' + url,
      data: _data,
      success: (data)=> {
        if (data.code === '200') {
          if (typeof callback === 'function') {
            callback(data);
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
        const m = Message.success({content: 'Server connection error'});
        setTimeout(()=> {
          const _comp = m.component;
          if (!_comp.state.children.length) {
            m.remove();
          }
        }, 3000);
      }
    });
  }

  likeChange(c) {
    const userData = this.props.userData;
    const title = this.props.title;
    const _data = {
      uid: userData.uid,
      session: userData.session,
      ia_id: this.accounts.iaId,
      type: title + 'Like',
      auto_switch: c,
    };
    this.switchAjax('switch_setting', _data);
  }

  commentChange(c) {
    const userData = this.props.userData;
    const title = this.props.title;
    const _data = {
      uid: userData.uid,
      session: userData.session,
      ia_id: this.accounts.iaId,
      type: title + 'Comment',
      auto_switch: c,
    };
    this.switchAjax('switch_setting', _data);
  }

  titleChange(e) {
    const value = e.target.value;
    let addShow = this.state.addShow;
    if (value) {
      addShow = true;
    } else {
      addShow = false
    }
    this.setState({
      addShow,
      value
    })
  }

  addClick() {
    const userData = this.props.userData;
    const value = this.state.value;
    const title = this.props.title;
    const _data = {
      uid: userData.uid,
      session: userData.session,
      ia_id: this.accounts.iaId,
      type: title,
      content: value,
    };
    this.switchAjax('add_setting', _data, (data)=> {
      const obj = {
        id: data.object.id
      };
      const name = this.props.title === 'user' ? `${this.props.title}name` : this.props.title;
      obj[name] = data.object[name];
      const listChildren = this.state.listChildren;
      listChildren.unshift(obj);
      this.setState({
        listChildren,
        value: '',
        addShow: null,
        listQueueType: 'right'
      })
    });
  }

  removeList(i, id) {
    const listChildren = this.state.listChildren;
    listChildren[i] = null;// .splice(i, 1);

    const userData = this.props.userData;
    const title = this.props.title;
    const _data = {
      uid: userData.uid,
      session: userData.session,
      ia_id: this.accounts.iaId,
      type: title,
      id: id,
    };
    this.switchAjax('del_setting', _data, ()=> {
      this.setState({
        listChildren,
        listQueueType: 'left'
      });
    });
  }

  render() {
    const className = this.props.className || '';
    const prefixCls = this.props.prefixCls || '';
    const title = this.props.title ? <div className={`${prefixCls}-title`}>
      <input type="text" placeholder={`Add new ${this.props.title}...`} className="user-switch-input" onChange={this.titleChange} value={this.state.value}/>
      <Animate
        transitionName="fade">
      {this.state.addShow ? <Icon type="plus-circle" className="user-switch-add-btn" key="add" onClick={this.addClick}/> : null}
      </Animate>
    </div> : null;
    const listChildToRender = this.state.listChildren.map((item, i)=> {
      if (!item) {
        return null;
      }
      const name = this.props.title === 'user' ? `${this.props.title}name` : this.props.title;
      return <li key={this.state.listChildren.length - i}>
        {this.props.title === 'user' ? <em className="user-switch-user-img" style={{backgroundImage: "url(" + (item.avatar || "/images/logo-user.png") + ")"}}></em> : null}
        <p>{this.props.type === 'tags' ? `#${item[name]}` : item[name]}</p>
        <i className="user-switch-list-close" onClick={this.removeList.bind(this, i, item.id)}/>
      </li>;
    });
    return <div className={`${prefixCls} ${className}`.trim()}>
    {title}
      <div className="user-switch-list">
        <QueueAnim type={this.state.listQueueType} component='ul'>{listChildToRender}</QueueAnim>
      </div>
    {this.props.switch ?
      <div className="user-switch-wap">
        <ul>
          <li>
            <Switch onChange={this.likeChange} defaultChecked={this.accounts[`${this.props.title}AutoLike`]} className="user-switch-switch" checkedChildren={<i className="like" />} unCheckedChildren={<i className="like-disabled" />}/>
            <p>Auto-like</p>
          </li>
          <li>
            <Switch onChange={this.commentChange} defaultChecked={this.accounts[`${this.props.title}AutoComment`]} className="user-switch-switch" checkedChildren={<i className="comment" />} unCheckedChildren={<i className="comment-disabled" />}/>
            <p>Auto-comment</p>
          </li>
        </ul>
      </div> : null}
    </div>
  }
}
UserDataSwitch.propTypes = {
  userData: React.PropTypes.object,
  title: React.PropTypes.string,
  type: React.PropTypes.string,
  switch: React.PropTypes.bool,
  prefixCls: React.PropTypes.string,
  userNum: React.PropTypes.number,
};
export default UserDataSwitch;