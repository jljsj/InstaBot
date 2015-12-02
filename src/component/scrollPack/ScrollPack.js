import React, {createElement, cloneElement} from 'react';
import ReactDOM, {findDOMNode} from 'react-dom';
import {
  toArrayChildren,
  getChildrenFromProps
  } from './utils';
import EventListener from './EventDispatcher';
const placeholderKeyPrefix = 'ant-scroll-pack-placeholder-';
class scrollAnim extends React.Component {
  constructor() {
    super(...arguments);
    this.originalChildren = toArrayChildren(this.props.children);
    const children = toArrayChildren(getChildrenFromProps(this.props));


    this.offset = [];
    this.keysOriginal = [];
    this.keysToAppear = [];
    this.clientHeight = document.body.clientHeight;

    this.state = {
      children,
      childrenShow: {},
    };

    [
      'scrollEventListener',
      'getoffset',
      'performAppear'
    ].forEach((method) => this[method] = this[method].bind(this));

    const date = Date.now();
    EventListener.addEventListener('scroll.scrollEvent' + date, this.scrollEventListener);
  }

  scrollEventListener(e) {
    this.clientHeight = document.body.clientHeight;
    this.scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    this.offset = this.originalChildren.map(this.getoffset);

    this.originalChildren.forEach((child, i) => {
      if (!child || !child.key) {
        return;
      }
      const top = this.offset[i].top;
      const clientHeight = this.clientHeight;
      if (this.scrollTop - top >= -(clientHeight * (1 - this.props.playScale))) {
        if (this.keysToAppear.indexOf(child.key) <= -1) {
          this.keysToAppear.push(child.key);
        }
      } else {
        if (this.keysToAppear.indexOf(child.key) >= 0 && this.props.repeat) {
          this.keysToAppear.splice(this.keysToAppear.indexOf(child.key), 1);
        }
      }
    });
    if (this.keysToAppear.length && this.keysToAppear.length !== this.keysOriginal.length) {
      this.performAppear();
      this.keysOriginal = this.keysToAppear.concat();
    }
    if (typeof this.props.scrollEvent === 'function') {
      let _e = e || {};
      _e.scrollTop = this.scrollTop;
      this.props.scrollEvent(_e);
    }
  }


  performAppear() {
    const childrenShow = this.state.childrenShow;

    this.originalChildren.forEach((child)=> {
      if (this.keysToAppear.indexOf(child.key) >= 0) {
        childrenShow[child.key] = true;
      } else {
        childrenShow[child.key] = false;
      }
    });

    this.setState({
      childrenShow,
    });

  }

  getoffset(child) {
    const key = child.key;
    if (!key) {
      return;
    }
    const node = findDOMNode(this.refs[key]);
    var obj = {
      key: key,
      top: node.offsetTop,
      height: node.offsetHeight
    };
    return obj;
  }

  componentDidMount() {
    //添加滚动监听；
    this.scrollEventListener(null);
  }

  render() {
    const childrenToRender = toArrayChildren(this.state.children).map((child, i) => {
      if (!child || !child.key) {
        return child;
      }

      const hide = this.state.childrenShow[child.key] ? true : false;
      if (typeof child.type === 'function') {
        return cloneElement(child, {ref: child.key, key: child.key, scrollShow: hide});
      }
      return cloneElement(child, {ref: child.key, key: child.key, scrollShow: hide},
        this.state.childrenShow[child.key] ?
          child.props.children : createElement('div', {
          ref: placeholderKeyPrefix + child.key,
          style: {height: this.clientHeight}
        }));
    });
    return createElement(this.props.component, this.props, childrenToRender);
  }
}
scrollAnim.propTypes = {
  component: React.PropTypes.string,
  playScale: React.PropTypes.number,
  repeat: React.PropTypes.bool,
  scrollEvent: React.PropTypes.func,
};

scrollAnim.defaultProps = {
  component: 'div',
  playScale: .5,
  repeat: true,
  scrollEvent: null,
};
export default scrollAnim;