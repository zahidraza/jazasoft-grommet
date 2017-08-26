(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../actions/errActions', '../actions/routerAction'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../actions/errActions'), require('../actions/routerAction'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.errActions, global.routerAction);
    global.errReducer = mod.exports;
  }
})(this, function (exports, _errActions, _routerAction) {
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

  //Two Step in Authetication:
  //1. Login 
  //2. get Profile
  var initialState = {
    show: false, //Whether to show error on bad request
    error: {},
    errors: []
  };

  var handlers = (_handlers = {}, _defineProperty(_handlers, _errActions.BAD_REQUEST, function (_, action) {
    var _action$payload = action.payload,
        error = _action$payload.error,
        errors = _action$payload.errors;

    if (!error) error = {};
    if (!errors) errors = [];
    return { error: error, errors: errors, show: true };
  }), _defineProperty(_handlers, _errActions.CLEAR_ERROR, function (_, action) {
    return { error: {}, show: false };
  }), _defineProperty(_handlers, _routerAction.LOCATION_CHANGE, function (_, action) {
    return { error: {}, errors: [], show: false };
  }), _handlers);

  function section() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    var handler = handlers[action.type];
    if (!handler) return state;
    return _extends({}, state, handler(state, action));
  }
});