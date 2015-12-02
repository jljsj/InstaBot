var EventDispatcher = function (target) {
  this._listeners = {};
  this._eventTarget = target || this;
};
var p = EventDispatcher.prototype;

p.addEventListener = function (type, callback) {
  var types = type.split(".").sort();
  var _type = types[0], namespaces = types[1];
  var list = this._listeners[type],
    index = 0,
    listener, i;
  if (list == null) {
    this._listeners[_type] = list = [];
  }
  i = list.length;
  while (--i > -1) {
    listener = list[i];
    if (listener.c === callback) {
      list.splice(i, 1);
    } else if (index === 0) {
      index = i + 1;
    }
  }
  var func = this.dispatchEvent.bind(this, _type);
  list.splice(index, 0, {c: callback, n: namespaces, t: _type, func: func});
  if (this._eventTarget.addEventListener) {
    this._eventTarget.addEventListener(_type, func, false);

  } else if (this._eventTarget.attachEvent) {
    this._eventTarget.attachEvent("on" + _type, eventHandle);
  }

};

p.removeEventListener = function (type, callback) {
  var list = this._listeners[type], i;
  if (list) {
    i = list.length;
    while (--i > -1) {
      if (list[i].c === callback) {
        list.splice(i, 1);
        if (this._eventTarget.removeEventListener) {
          this._eventTarget.removeEventListener(list.t, list.func);
        } else if (this._eventTarget.detachEvent) {
          this._eventTarget.detachEvent(list.t, list.func);
        }

        return;
      }
    }
  }
};

p.dispatchEvent = function (type) {
  var list = this._listeners[type],
    i, t, listener;
  if (list) {
    i = list.length;
    t = this._eventTarget;
    while (--i > -1) {
      listener = list[i];
      if (listener) {
        listener.c.call(t, {type: type, target: t});
      }
    }
  }

};
export default new EventDispatcher(window);