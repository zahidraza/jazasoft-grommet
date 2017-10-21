import axios from 'axios';
import createHistory from 'history/createHashHistory';
import { BAD_REQUEST } from '../actions/errActions';
import {SHOW_SNACKBAR, SHOW_NOTIFICATION} from '../actions/notificationActions';
import {USER_LOGOUT, userLogout} from '../actions/authActions';

import {
    GET_LIST,
    GET_ONE,
    GET_MANY,
    CREATE,
    UPDATE,
    DELETE,
    UPDATE_MANY,
    PATCH,
    CUSTOM
} from './types';

const history = createHistory();

export const fetch = (config = {}, dispatch) => {
  const requestHeaders = config.headers || {
    'Accept': 'application/json'
  };
  if (config && config.data) {
    requestHeaders['Content-Type'] = 'application/json';
  }
  if (localStorage.accessToken) {
    requestHeaders['Authorization'] = 'Bearer ' + localStorage.accessToken;
  }

  return axios({headers: requestHeaders, ...config})
      .catch(error => {
        if (typeof dispatch === 'function') {
          const response = error.response;
          if (response.status == 400) {
            if (response.data instanceof Array) {
              let err = {};
              response.data.forEach(e => {
                err[e.field] = e.message;
              });
              dispatch({type: BAD_REQUEST, payload: { error: err}});
            }
          } else if (response.status == 401) {
            dispatch(userLogout());
            history.push('/login');
            setTimeout(() => {
              dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: 'Session Expired. Please Login Again.', duration: 'long'}}});
            }, 100);
          } else if (response.status == 403) {
            if (response.data && response.data.message) {
              dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: response.data.message, duration: 'long'}}});
            } else {
              dispatch({type: SHOW_SNACKBAR, payload: {snackbar: {message: 'Access Denied. You do not have enough privilege for this operation.', duration: 'long'}}});
            }
            
          } else {
            if (response.data && response.data instanceof Object && response.data.message) {
              dispatch({type: SHOW_NOTIFICATION, payload: {nfn: {message: response.data.message, status: 'critical'}}});
            } 
            if (!response.data || !(response.data instanceof Object) || !response.data.message) {
              console.log(response);
            }
          }
        }
        return Promise.reject(error);
      });
};

export default (apiUrl) => {

  const convertRESTRequestToHTTP = (type, resource, options) => {
    const config = {};
    config.params = options.params || {};
    if (options.headers) {
      config.headers = options.headers;
    }

    switch (type) {
    case GET_LIST: {
      config.method = 'get';
      config.url = `${apiUrl}/${resource}`;
      break;
    }
    case GET_MANY: {
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
    case PATCH:
      config.url = `${apiUrl}/${resource}/${options.id}`;
      config.method = 'PATCH';
      config.data = JSON.stringify(options.data);
      break;
    case UPDATE_MANY:
      config.url = `${apiUrl}/${resource}`;
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
    case CUSTOM:
      config.url = `${apiUrl}/${options.url}`;
      config.method = options.method;
      if (options.data) {
        config.data = JSON.stringify(options.data);
      }
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

