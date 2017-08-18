(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'axios', 'history/createHashHistory', '../actions/errActions', '../actions/notificationActions', '../actions/authActions', './types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('axios'), require('history/createHashHistory'), require('../actions/errActions'), require('../actions/notificationActions'), require('../actions/authActions'), require('./types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.axios, global.createHashHistory, global.errActions, global.notificationActions, global.authActions, global.types);
    global.RestClient = mod.exports;
  }
})(this, function (exports, _axios, _createHashHistory, _errActions, _notificationActions, _authActions, _types) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.fetch = undefined;

  var _axios2 = _interopRequireDefault(_axios);

  var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

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

  var history = (0, _createHashHistory2.default)();

  var fetch = exports.fetch = function fetch() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var dispatch = arguments[1];

    var requestHeaders = config.headers || {
      'Accept': 'application/json'
    };
    if (config && config.data) {
      requestHeaders['Content-Type'] = 'application/json';
    }
    if (sessionStorage.accessToken) {
      requestHeaders['Authorization'] = 'Bearer ' + sessionStorage.accessToken;
    }

    return (0, _axios2.default)(_extends({ headers: requestHeaders }, config)).catch(function (error) {
      if (typeof dispatch === 'function') {
        var response = error.response;
        if (response.status == 400) {
          if (response.data instanceof Array) {
            var err = {};
            response.data.forEach(function (e) {
              err[e.field] = e.message;
            });
            dispatch({ type: _errActions.BAD_REQUEST, payload: { error: err } });
          }
        } else if (response.status == 401) {
          dispatch((0, _authActions.userLogout)());
          history.push('/login');
          setTimeout(function () {
            dispatch({ type: _notificationActions.SHOW_SNACKBAR, payload: { snackbar: { message: 'Session Expired. Please Login Again.', duration: 'long' } } });
          }, 100);
        } else if (response.status == 403) {
          dispatch({ type: _notificationActions.SHOW_SNACKBAR, payload: { snackbar: { message: 'Access Denied. You do not have enough privilege for this operation.', duration: 'long' } } });
        } else {
          if (response.data && response.data instanceof Object && response.data.message) {
            dispatch({ type: _notificationActions.SHOW_NOTIFICATION, payload: { nfn: { message: response.data.message, status: 'critical' } } });
          }
          if (!response.data || !(response.data instanceof Object) || !response.data.message) {
            console.log(response);
          }
        }
      }
      return Promise.reject(error);
    });
  };

  exports.default = function (apiUrl) {

    var convertRESTRequestToHTTP = function convertRESTRequestToHTTP(type, resource, options) {
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
        case _types.PATCH:
          config.url = apiUrl + '/' + resource + '/' + options.id;
          config.method = 'PATCH';
          config.data = JSON.stringify(options.data);
          break;
        case _types.UPDATE_MANY:
          config.url = apiUrl + '/' + resource;
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