(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../utils/fetch', './types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../utils/fetch'), require('./types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.fetch, global.types);
    global.temp = mod.exports;
  }
})(this, function (exports, _fetch, _types) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

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

  exports.default = function (apiUrl) {
    var httpClient = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _fetch.fetchJson;

    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    var convertRESTRequestToHTTP = function convertRESTRequestToHTTP(type, resource, params) {
      var url = '';
      var options = {};
      switch (type) {
        case _types.GET_LIST:
          {
            var _params$pagination = params.pagination,
                page = _params$pagination.page,
                perPage = _params$pagination.perPage;
            var _params$sort = params.sort,
                field = _params$sort.field,
                order = _params$sort.order;

            var query = _extends({}, params.filter, {
              _sort: field,
              _order: order,
              _start: (page - 1) * perPage,
              _end: page * perPage
            });
            url = apiUrl + '/' + resource + '?' + (0, _fetch.queryParameters)(query);
            break;
          }
        case _types.GET_ONE:
          url = apiUrl + '/' + resource + '/' + params.id;
          break;
        case _types.UPDATE:
          url = apiUrl + '/' + resource + '/' + params.id;
          options.method = 'PUT';
          options.body = JSON.stringify(params.data);
          break;
        case _types.CREATE:
          url = apiUrl + '/' + resource;
          options.method = 'POST';
          options.body = JSON.stringify(params.data);
          break;
        case _types.DELETE:
          url = apiUrl + '/' + resource + '/' + params.id;
          options.method = 'DELETE';
          break;
        default:
          throw new Error('Unsupported fetch action type ' + type);
      }
      return { url: url, options: options };
    };

    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The REST request params, depending on the type
     * @returns {Object} REST response
     */
    var convertHTTPResponseToREST = function convertHTTPResponseToREST(response, type, resource, params) {
      var body = response.body,
          json = response.json;

      switch (type) {
        case _types.GET_LIST:
        case _types.CREATE:
        default:
          return { data: json, text: body };
      }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. 'posts'
     * @param {Object} params Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a REST response
     */
    return function (type, resource, params) {
      // json-server doesn't handle WHERE IN requests, so we fallback to calling GET_ONE n times instead
      if (type === _types.GET_MANY) {
        return Promise.all(params.ids.map(function (id) {
          return httpClient(apiUrl + '/' + resource + '/' + id);
        })).then(function (responses) {
          return { data: responses.map(function (response) {
              return response.json;
            }) };
        });
      }

      var _convertRESTRequestTo = convertRESTRequestToHTTP(type, resource, params),
          url = _convertRESTRequestTo.url,
          options = _convertRESTRequestTo.options;

      return httpClient(url, options).then(function (response) {
        return convertHTTPResponseToREST(response, type, resource, params);
      });
    };
  };
});