(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './RestClient', './AuthClient'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./RestClient'), require('./AuthClient'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.RestClient, global.AuthClient);
    global.index = mod.exports;
  }
})(this, function (exports, _RestClient, _AuthClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'RestClient', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_RestClient).default;
    }
  });
  Object.defineProperty(exports, 'AuthClient', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_AuthClient).default;
    }
  });

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});