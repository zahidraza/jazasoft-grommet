(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'axios', './types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('axios'), require('./types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.axios, global.types);
    global.RestClient = mod.exports;
  }
})(this, function (exports, _axios, _types) {
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
      'Accept': 'application/json'
    };
    if (config && config.data) {
      requestHeaders['Content-Type'] = 'application/json';
    }
    if (sessionStorage.authenticated && sessionStorage.accessToken) {
      requestHeaders['Authorization'] = 'Bearer ' + sessionStorage.accessToken;
    }

    return (0, _axios2.default)(_extends({ headers: requestHeaders }, config)).catch(function (error) {
      console.log('error occured');

      if (typeof dispatch === 'function') {
        //TODO: dispatch notification action
        dispatch({ type: 'USER_ADD' });
      }
      return error;
    });
  };

  exports.default = function (apiUrl) {

    var convertRESTRequestToHTTP = function convertRESTRequestToHTTP(type, resource, options) {
      var url = '';
      var config = {};
      config.params = options.params || {};

      switch (type) {
        case _types.GET_LIST:
          {
            config.method = 'get';
            config.url = apiUrl + '/' + resource;
            break;
          }
        case _types.GET_ONE:
          config.method = 'get';
          config.url = apiUrl + '/' + resource + '/' + options.id;
          break;
        case _types.UPDATE:
          config.url = apiUrl + '/' + resource + '/' + options.id;
          config.method = 'PUT';
          config.data = JSON.stringify(options.data);
          break;
        case _types.CREATE:
          config.url = apiUrl + '/' + resource;
          config.method = 'POST';
          config.data = JSON.stringify(options.data);
          break;
        case _types.DELETE:
          config.url = apiUrl + '/' + resource + '/' + options.id;
          config.method = 'DELETE';
          break;
        default:
          throw new Error('Unsupported fetch action type ' + type);
      }
      return config;
    };

    return function (type, resource, options, dispatch) {
      var config = convertRESTRequestToHTTP(type, resource, options);
      return fetch(config, dispatch);
    };
  };
});