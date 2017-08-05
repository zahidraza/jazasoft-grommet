import axios from 'axios';

import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    CREATE,
    UPDATE,
    DELETE,
} from './types';

export const fetch = (config = {}, dispatch) => {
  const requestHeaders = config.headers || {
    'Accept': 'application/json',
  };
  if (config && config.data) {
    requestHeaders['Content-Type'] = 'application/json';
  }
  if (sessionStorage.authenticated && sessionStorage.accessToken) {
    requestHeaders['Authorization'] = 'Bearer ' + sessionStorage.accessToken;
  }

  return axios({headers: requestHeaders, ...config})
      .catch(error => {
        console.log('error occured');

        if (typeof dispatch === 'function') {
          //TODO: dispatch notification action
          dispatch({type: 'USER_ADD'});
        }
        return error;
      });
};

export default (apiUrl) => {

  const convertRESTRequestToHTTP = (type, resource, options) => {
    let url = '';
    const config = {};
    config.params = options.params || {};

    switch (type) {
    case GET_LIST: {
      config.method = 'get';
      config.url = `${apiUrl}/${resource}`;
      break;
    }
    case GET_ONE:
      config.method = 'get';
      config.url = `${apiUrl}/${resource}/${options.id}`;
      break;
    case UPDATE:
      config.url = `${apiUrl}/${resource}/${options.id}`;
      config.method = 'PUT';
      config.data = JSON.stringify(options.data);
      break;
    case CREATE:
      config.url = `${apiUrl}/${resource}`;
      config.method = 'POST';
      config.data = JSON.stringify(options.data);
      break;
    case DELETE:
      config.url = `${apiUrl}/${resource}/${options.id}`;
      config.method = 'DELETE';
      break;
    default:
      throw new Error(`Unsupported fetch action type ${type}`);
    }
    return config;
  };

  return (type, resource, options, dispatch) => {
    const config = convertRESTRequestToHTTP(type, resource, options);
    return fetch(config, dispatch);
  };
};

