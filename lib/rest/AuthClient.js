(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'axios', '../utils/fetch', './authTypes'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('axios'), require('../utils/fetch'), require('./authTypes'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.axios, global.fetch, global.authTypes);
    global.AuthClient = mod.exports;
  }
})(this, function (exports, _axios, _fetch, _authTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fetch = undefined;

  var _axios2 = _interopRequireDefault(_axios);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
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

  var fetch = exports.fetch = function fetch() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var dispatch = arguments[1];

    var requestHeaders = config.headers || {
      'Accept': 'application/json',
      'Authorization': 'Basic ' + sessionStorage.clientToken
    };

    return (0, _axios2.default)(_extends({ headers: requestHeaders }, config));
    // .catch(error => {
    //   if (typeof dispatch === 'function') {
    //     //TODO: dispatch notification action
    //   }
    //   return error;
    // });
  };

  exports.default = function (authUrl) {

    var convertRESTRequestToHTTP = function convertRESTRequestToHTTP(type, options) {
      var config = {};
      config.params = options.params || {};

      switch (type) {
        case _authTypes.AUTH_LOGIN:
          config.url = authUrl + '/token';
          config.method = 'POST';
          break;
        default:
          throw new Error('Unsupported authentication type - ' + type);
      }
      return config;
    };

    return function (type, options) {
      var config = convertRESTRequestToHTTP(type, options);
      return fetch(config);
    };
  };
});