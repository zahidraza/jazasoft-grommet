(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../actions/notificationActions'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../actions/notificationActions'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.notificationActions);
    global.notificationReducer = mod.exports;
  }
})(this, function (exports, _notificationActions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = section;

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  var _handlers;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var initialState = {
    showSnackbar: false,
    snackbar: {},
    showNotification: false,
    notification: {}
  };

  var handlers = (_handlers = {}, _defineProperty(_handlers, _notificationActions.SHOW_NOTIFICATION, function (_, action) {
    return { showNotification: true, notification: action.payload.nfn };
  }), _defineProperty(_handlers, _notificationActions.CLEAR_NOTIFICATION, function (_, action) {
    return { showNotification: false, notification: {} };
  }), _defineProperty(_handlers, _notificationActions.SHOW_SNACKBAR, function (_, action) {
    return { showSnackbar: true, snackbar: action.payload.snackbar };
  }), _defineProperty(_handlers, _notificationActions.CLEAR_SNACKBAR, function (_, action) {
    return { showSnackbar: false, snackbar: {} };
  }), _handlers);

  function section() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    var handler = handlers[action.type];
    if (!handler) return state;
    return _extends({}, state, handler(state, action));
  }
});