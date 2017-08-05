(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './authReducer', './notificationReducer', './routerReducer'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./authReducer'), require('./notificationReducer'), require('./routerReducer'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.authReducer, global.notificationReducer, global.routerReducer);
    global.index = mod.exports;
  }
})(this, function (exports, _authReducer, _notificationReducer, _routerReducer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'authReducer', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_authReducer).default;
    }
  });
  Object.defineProperty(exports, 'notificationReducer', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_notificationReducer).default;
    }
  });
  Object.defineProperty(exports, 'routerReducer', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_routerReducer).default;
    }
  });

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});