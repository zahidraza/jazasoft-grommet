(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './authReducer', './notificationReducer', './routerReducer', './errReducer', './filterReducer'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./authReducer'), require('./notificationReducer'), require('./routerReducer'), require('./errReducer'), require('./filterReducer'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.authReducer, global.notificationReducer, global.routerReducer, global.errReducer, global.filterReducer);
    global.index = mod.exports;
  }
})(this, function (exports, _authReducer, _notificationReducer, _routerReducer, _errReducer, _filterReducer) {
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
  Object.defineProperty(exports, 'errReducer', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_errReducer).default;
    }
  });
  Object.defineProperty(exports, 'filterReducer', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_filterReducer).default;
    }
  });

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});