import React from 'react';

export function toArrayChildren(children) {
  const ret = [];
  React.Children.forEach(children, (c) => {
    ret.push(c);
  });
  return ret;
}

export function getChildrenFromProps(props) {
  return props && props.children;
}
