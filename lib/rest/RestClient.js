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
    global.RestClient = mod.exports;
  }
})(this, function (exports, _fetch, _types) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

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
        case GET_MANY_REFERENCE:
          {
            var _extends2;

            var _params$pagination2 = params.pagination,
                _page = _params$pagination2.page,
                _perPage = _params$pagination2.perPage;
            var _params$sort2 = params.sort,
                _field = _params$sort2.field,
                _order = _params$sort2.order;

            var _query = _extends({}, params.filter, (_extends2 = {}, _defineProperty(_extends2, params.target, params.id), _defineProperty(_extends2, '_sort', _field), _defineProperty(_extends2, '_order', _order), _defineProperty(_extends2, '_start', (_page - 1) * _perPage), _defineProperty(_extends2, '_end', _page * _perPage), _extends2));
            url = apiUrl + '/' + resource + '?' + (0, _fetch.queryParameters)(_query);
            break;
          }
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
      var headers = response.headers,
          json = response.json;

      switch (type) {
        case _types.GET_LIST:
        case GET_MANY_REFERENCE:
          if (!headers.has('x-total-count')) {
            throw new Error('The X-Total-Count header is missing in the HTTP Response. The jsonServer REST client expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare X-Total-Count in the Access-Control-Expose-Headers header?');
          }
          return {
            data: json,
            total: parseInt(headers.get('x-total-count').split('/').pop(), 10)
          };
        case _types.CREATE:
          return { data: _extends({}, params.data, { id: json.id }) };
        default:
          return { data: json };
      }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
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