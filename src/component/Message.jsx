import React from 'react';
import ReactDOM from 'react-dom';
import {classSet} from 'rc-util';
import assign from 'object-assign';
import './Message.less';

let index = 0, messageDom;
const now = Date.now();

function getUuid() {
  return 'message_' + now + '_' + (index++);
}
class Message extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      children: [],
      close: false,
    }
  }

  add(obj) {
    const children = this.state.children;
    this.setState({
      children: children.concat(this.getElement(obj.content, obj.key)),
    }, ()=> {
      setTimeout(this.remove.bind(this, obj.key), this.props.duration)
    })
  }

  remove(key) {
    const children = this.state.children.map((child)=> {
      if (child.key === key) {
        let props = assign({}, child.props);
        props.className = props.className + ' ' + this.props.prefixCls + '-close';
        return React.cloneElement(child, props);
      }
      return child;
    });
    this.setState({
      children: children,
    });
    setTimeout(()=> {
      this.removeEndSetNull(key);
    }, 900)
  }

  removeEndSetNull(key) {
    const children = this.state.children.filter((child)=> {
      return child.key !== key;
    });
    this.setState({
      children: children,
    })
  }

  getElement(content, key) {
    const props = this.props;
    const className = {
      [props.prefixCls]: 1,
      [props.className]: !!props.className,
    };
    return <div className={classSet(className)} style={props.style} key={key}>
      <div className={props.prefixCls + '-left-bg'}></div>
      <div className={props.prefixCls + '-right-bg'}></div>
      <span>{content}</span>
    </div>
  }

  render() {
    return <div>{this.state.children}</div>;
  }
}
Message.propTypes = {
  content: React.PropTypes.string,
  prefixCls: React.PropTypes.string,
  duration: React.PropTypes.number,
};

Message.defaultProps = {
  content: '全局提示框',
  prefixCls: 'message',
  duration: 2000,
};
export default {
  success(_props) {
    const props = _props || {};
    messageDom = messageDom || document.createElement('div');
    document.body.appendChild(messageDom);
    const message = ReactDOM.render(<Message {...props}/>, messageDom);
    const key = getUuid();
    message.add({key: key, content: props.content, duration: props.duration});
    return {
      component: message,
      remove() {
        ReactDOM.unmountComponentAtNode(messageDom);
        document.body.removeChild(messageDom);
      }
    }
  },
}
