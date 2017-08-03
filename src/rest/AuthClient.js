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
