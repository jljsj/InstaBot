import React from 'react';
import ReactDOM from 'react-dom';
import {classSet} from 'rc-util';
import Animate from 'rc-animate';
import Component from 'rc-dialog/lib/Dialog';
import DOMWrap from 'rc-dialog/lib/DOMWrap';


function getScroll(w, top) {
  let ret = w['page' + (top ? 'Y' : 'X') + 'Offset'];
  const method = 'scroll' + (top ? 'Top' : 'Left');
  if (typeof ret !== 'number') {
    const d = w.document;
    ret = d.documentElement[method];
    if (typeof ret !== 'number') {
      ret = d.body[method];
    }
  }
  return ret;
}



class Dialog extends Component {

  MaskElement() {
    const props = this.props;
    const maskProps = {
      onClick: this.onMaskClick,
    };

    if (props.zIndex) {
      maskProps.style = {zIndex: props.zIndex};
    }
    let maskElement;
    if (props.mask) {
      const maskTransition = this.getMaskTransitionName();
      maskElement = (<DOMWrap {...maskProps} className={`${props.prefixCls}-mask`}
        visible={props.visible}
        hiddenClassName={`${props.prefixCls}-mask-hidden`} >
        {this.props.closable ?
          (<a tabIndex="0" onClick={this.close} className={`${props.prefixCls}-close`}>
            <span className={`${props.prefixCls}-close-x`}></span>
          </a>) :
          null}
      </DOMWrap>);
      if (maskTransition) {
        maskElement = (<Animate key="mask" showProp="visible"
          transitionAppear component=""
          transitionName={maskTransition}>{maskElement}</Animate>);
      }
    }
    return maskElement;
  }

  render() {
    const props = this.props;
    const prefixCls = props.prefixCls;
    const className = {
      [`${prefixCls}-wrap`]: 1,
    };

    return React.createElement('div', {className: classSet(className)}, [React.cloneElement(this.MaskElement(), {key: 'mask'}), this.getDialogElement()]);
  }
}
export default Dialog;