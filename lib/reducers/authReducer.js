(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../actions/authActions'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../actions/authActions'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.authActions);
    global.authReducer = mod.exports;
  }
})(this, function (exports, _authActions) {
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
    authProgress: false,
    authenticated: false
  };

  var handlers = (_handlers = {}, _defineProperty(_handlers, _authActions.AUTH_PROGRESS, function (_, action) {
    return { authProgress: true };
  }), _defineProperty(_handlers, _authActions.AUTH_SUCCESS, function (_, action) {
    return { authProgress: false, authenticated: true };
  }), _defineProperty(_handlers, _authActions.AUTH_FAILURE, function (_, action) {
    return { authProgress: false, authenticated: false };
  }), _defineProperty(_handlers, _authActions.USER_LOGOUT, function (_, action) {
    return { authProgress: false, authenticated: false };
  }), _handlers);

  function section() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    var handler = handlers[action.type];
    if (!handler) return state;
    return _extends({}, state, handler(state, action));
  }
});