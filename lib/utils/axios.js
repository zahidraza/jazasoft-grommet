(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'axios', './HttpError'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('axios'), require('./HttpError'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.axios, global.HttpError);
    global.axios = mod.exports;
  }
})(this, function (exports, _axios, _HttpError) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.queryParameters = exports.fetchJson = undefined;

  var _axios2 = _interopRequireDefault(_axios);

  var _HttpError2 = _interopRequireDefault(_HttpError);

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

  var fetchJson = exports.fetchJson = function fetchJson() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

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
      console.log(error);
      return error;
    });

    // return fetch(url, { ...config, headers: requestHeaders })
    //     .then(response => response.text().then(text => ({
    //       status: response.status,
    //       statusText: response.statusText,
    //       headers: response.headers,
    //       body: text,
    //     })))
    //     .then(({ status, statusText, headers, body }) => {
    //       let json;
    //       try {
    //         json = JSON.parse(body);
    //       } catch (e) {
    //           // not json, no big deal
    //       }
    //       if (status < 200 || status >= 300) {
    //         return Promise.reject(new HttpError((json && json.message) || statusText, status));
    //       }
    //       return { status, headers, body, json };
    //     });
  };

  var queryParameters = exports.queryParameters = function queryParameters(data) {
    return Object.keys(data).map(function (key) {
      return [key, data[key]].join('=');
    }).join('&');
  };
});