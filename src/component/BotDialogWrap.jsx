import React from 'react';
import ReactDOM from 'react-dom';
import DialogWrap from 'rc-dialog';
import Dialog from './Dialog';
import assign from 'object-assign';
import './Dialog.less'

function noop() {
}
function copy(obj, fields) {
  const ret = {};
  fields.forEach((f)=> {
    if (obj[f] !== undefined) {
      ret[f] = obj[f];
    }
  });
  return ret;
}


class botDialogWrap extends DialogWrap {

  getDialogElement(extra) {
    const props = this.props;
    const dialogProps = copy(props, [
      'className', 'closable', 'align',
      'title', 'footer', 'mask',
      'animation', 'transitionName',
      'maskAnimation', 'maskTransitionName', 'mousePosition',
      'prefixCls', 'style', 'width',
      'height', 'zIndex',
    ]);


    assign(dialogProps, {
      onClose: this.onClose,
      visible: this.state.visible,
    }, extra);
    return (<Dialog {...dialogProps} key="dialog">
      {props.children}
    </Dialog>);
  }
}
botDialogWrap.defaultProps = {
  className: '',
  align: {
    points: ['tc', 'tc'],
    offset: [0, 100],
  },
  mask: true,
  closable: true,
  prefixCls: 'rc-dialog',
  onClose: noop,
};

botDialogWrap.propTypes = {
  className: React.PropTypes.string,
  align: React.PropTypes.shape({
    align: React.PropTypes.array,
    offset: React.PropTypes.arrayOf(React.PropTypes.number),
  }),
  mask: React.PropTypes.bool,
  closable: React.PropTypes.bool,
  prefixCls: React.PropTypes.string,
  visible: React.PropTypes.bool,
  onClose: React.PropTypes.func,
};
export default botDialogWrap;