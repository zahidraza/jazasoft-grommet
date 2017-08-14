(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../actions/filterActions', '../actions/routerAction'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../actions/filterActions'), require('../actions/routerAction'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.filterActions, global.routerAction);
    global.filterReducer = mod.exports;
  }
})(this, function (exports, _filterActions, _routerAction) {
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
    filter: {},
    filteredTotal: 0,
    unfilteredTotal: 0,
    toggleCount: true // toggle only when filter count changes
  };

  var handlers = (_handlers = {}, _defineProperty(_handlers, _filterActions.FILTER_APPLY, function (_, action) {
    return { filter: action.payload.filter };
  }), _defineProperty(_handlers, _filterActions.FILTER_COUNT, function (_, action) {
    return { filteredTotal: action.payload.filteredTotal, unfilteredTotal: action.payload.unfilteredTotal, toggleCount: !_.toggleCount };
  }), _defineProperty(_handlers, _routerAction.LOCATION_CHANGE, function (_, action) {
    return { filter: {}, filteredTotal: 0, unfilteredTotal: 0 };
  }), _defineProperty(_handlers, _filterActions.FILTER_CLEAR, function (_, action) {
    return { filter: {}, filteredTotal: 0, unfilteredTotal: 0 };
  }), _handlers);

  function section() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    var handler = handlers[action.type];
    if (!handler) return state;
    return _extends({}, state, handler(state, action));
  }
});