(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../utils/fetch', './authTypes'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../utils/fetch'), require('./authTypes'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.fetch, global.authTypes);
    global.AuthClient = mod.exports;
  }
})(this, function (exports, _fetch, _authTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (authUrl) {
    var httpClient = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _fetch.fetchJson;


    var convertRESTRequestToHTTP = function convertRESTRequestToHTTP(type, params) {
      var url = '';
      var options = {};
      switch (type) {
        case _authTypes.AUTH_LOGIN:
          url = authUrl + '/token?' + (0, _fetch.queryParameters)(params);
          options.method = 'POST';
          options.headers = new Headers({ Authorization: 'Basic ' + sessionStorage.clientToken });
          break;
        default:
          throw new Error('Unsupported authentication type - ' + type);
      }
      return { url: url, options: options };
    };

    var convertHTTPResponseToREST = function convertHTTPResponseToREST(response, type, params) {
      var headers = response.headers,
          json = response.json;

      switch (type) {
        default:
          return { data: json };
      }
    };

    return function (type, params) {
      var _convertRESTRequestTo = convertRESTRequestToHTTP(type, params),
          url = _convertRESTRequestTo.url,
          options = _convertRESTRequestTo.options;

      return httpClient(url, options);
    };
  };
});