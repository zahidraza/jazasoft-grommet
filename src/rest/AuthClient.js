import axios from 'axios';

import { queryParameters, fetchJson } from '../utils/fetch';
import { AUTH_LOGIN, AUTH_PROFILE, AUTH_LOGOUT, CUSTOM } from './authTypes';

export const fetch = (config = {}, dispatch) => {
  const requestHeaders = config.headers || {
    'Accept': 'application/json',
    'Authorization': 'Basic ' + localStorage.clientToken
  };

  return axios({headers: requestHeaders, ...config});
};

export default (authUrl) => {
  
  const convertRESTRequestToHTTP = (type, options) => {
    const config = {};
    config.params = options.params || {};

    switch (type) {
    case AUTH_LOGIN:
      config.url = `${authUrl}/oauth/token`;
      config.method = 'POST';
      break;
    case AUTH_PROFILE:
      config.url = `${authUrl}/api/users/profile`;
      config.method = 'get';
      config.headers = {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage['access_token']
      }
      break;
    case CUSTOM:
      config.url = `${authUrl}/${options.url}`;
      config.method = options.method;
      config.headers = options.headers || {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + localStorage['access_token']
      }
      config.data = options.data;
      break;

    default:
      throw new Error(`Unsupported authentication type - ${type}`);
    }
    return config;
  };

  return (type, options) => {
    const config = convertRESTRequestToHTTP(type, options);
    return fetch(config);
  };
};
