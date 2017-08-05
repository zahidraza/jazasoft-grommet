import { queryParameters, fetchJson } from '../utils/fetch';
import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    CREATE,
    UPDATE,
    DELETE,
} from './types';

/**
 * Maps admin-on-rest queries to a json-server powered REST API
 *
 * @see https://github.com/typicode/json-server
 * @example
 * @param {String} apiUrl Api Url
 * @param {function} httpClient http client
 * @returns {function} 
 * GET_LIST     => GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts/123, GET http://my.api.url/posts/456, GET http://my.api.url/posts/789
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchJson) => {
  /**
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The REST request params, depending on the type
   * @returns {Object} { url, options } The HTTP request parameters
   */
  const convertRESTRequestToHTTP = (type, resource, params) => {
    let url = '';
    const options = {};
    switch (type) {
    case GET_LIST: {
      const { page, perPage } = params.pagination;
      const { field, order } = params.sort;
      const query = {
        ...params.filter,
        _sort: field,
        _order: order,
        _start: (page - 1) * perPage,
        _end: page * perPage,
      };
      url = `${apiUrl}/${resource}?${queryParameters(query)}`;
      break;
    }
    case GET_ONE:
      url = `${apiUrl}/${resource}/${params.id}`;
      break;
    case UPDATE:
      url = `${apiUrl}/${resource}/${params.id}`;
      options.method = 'PUT';
      options.body = JSON.stringify(params.data);
      break;
    case CREATE:
      url = `${apiUrl}/${resource}`;
      options.method = 'POST';
      options.body = JSON.stringify(params.data);
      break;
    case DELETE:
      url = `${apiUrl}/${resource}/${params.id}`;
      options.method = 'DELETE';
      break;
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
  };

  /**
   * @param {Object} response HTTP response from fetch()
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The REST request params, depending on the type
   * @returns {Object} REST response
   */
  const convertHTTPResponseToREST = (response, type, resource, params) => {
    const { body, json } = response;
    switch (type) {
    case GET_LIST:
    case CREATE:
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
  return (type, resource, params) => {
    // json-server doesn't handle WHERE IN requests, so we fallback to calling GET_ONE n times instead
    if (type === GET_MANY) {
      return Promise.all(params.ids.map(id => httpClient(`${apiUrl}/${resource}/${id}`)))
            .then(responses => ({ data: responses.map(response => response.json) }));
    }
    const { url, options } = convertRESTRequestToHTTP(type, resource, params);
    return httpClient(url, options)
        .then(response => convertHTTPResponseToREST(response, type, resource, params));
  };
};



//AuthClient

import { queryParameters, fetchJson } from '../utils/fetch';
import { AUTH_LOGIN, AUTH_LOGOUT } from './authTypes';

/*
 * GET_LIST     => GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24
 */
export default (authUrl, httpClient = fetchJson) => {
  
  const convertRESTRequestToHTTP = (type, params) => {
    let url = '';
    const options = {};
    switch (type) {
    case AUTH_LOGIN:
      url = `${authUrl}/token?${queryParameters(params)}`;
      options.method = 'POST';
      options.headers = new Headers({Authorization: 'Basic ' + sessionStorage.clientToken});
      break;
    default:
      throw new Error(`Unsupported authentication type - ${type}`);
    }
    return { url, options };
  };

  const convertHTTPResponseToREST = (response, type, params) => {
    const { headers, json } = response;
    switch (type) {
    default:
      return { data: json };
    }
  };

  return (type, params) => {
    const { url, options } = convertRESTRequestToHTTP(type, params);
    return httpClient(url, options);
  };
};
