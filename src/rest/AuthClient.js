import axios from 'axios';

import { queryParameters, fetchJson } from '../utils/fetch';
import { AUTH_LOGIN, AUTH_LOGOUT } from './authTypes';

export const fetch = (config = {}, dispatch) => {
  const requestHeaders = config.headers || {
    'Accept': 'application/json',
    'Authorization': 'Basic ' + sessionStorage.clientToken
  };

  return axios({headers: requestHeaders, ...config});
      // .catch(error => {
      //   if (typeof dispatch === 'function') {
      //     //TODO: dispatch notification action
      //   }
      //   return error;
      // });
};

export default (authUrl) => {
  
  const convertRESTRequestToHTTP = (type, options) => {
    const config = {};
    config.params = options.params || {};

    switch (type) {
    case AUTH_LOGIN:
      config.url = `${authUrl}/token`;
      config.method = 'POST';
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
