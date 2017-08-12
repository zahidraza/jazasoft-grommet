(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../actions/formActions', '../actions/routerAction'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../actions/formActions'), require('../actions/routerAction'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.formActions, global.routerAction);
    global.formReducer = mod.exports;
  }
})(this, function (exports, _formActions, _routerAction) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = section;

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

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

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

  var initialState = {
    formData: {},
    collectionData: [],
    toggleForm: true
  };

  var handlers = (_handlers = {}, _defineProperty(_handlers, _formActions.FORM_CHANGE_BASIC, function (_, action) {
    var formData = _.formData;
    formData = _extends({}, formData, action.payload);
    return { formData: formData, toggleForm: !_.toggleForm };
  }), _defineProperty(_handlers, _formActions.FORM_CHANGE_COLLECTION, function (_, action) {
    var collectionData = [].concat(_toConsumableArray(_.collectionData));
    collectionData[action.payload.index] = action.payload.collections;
    return { collectionData: collectionData, toggleForm: !_.toggleForm };
  }), _defineProperty(_handlers, _formActions.FORM_CLEAR, function (_, action) {
    return { formData: {}, toggleForm: !_.toggleForm };
  }), _defineProperty(_handlers, _routerAction.LOCATION_CHANGE, function (_, action) {
    return { formData: {}, toggleForm: !_.toggleForm };
  }), _handlers);

  function section() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    var handler = handlers[action.type];
    if (!handler) return state;
    return _extends({}, state, handler(state, action));
  }
});