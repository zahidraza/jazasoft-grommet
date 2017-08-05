import axios from 'axios';
import HttpError from './HttpError';


export const fetchJson = (config = {}) => {
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
        console.log(error);
        return error;
      })

  // return fetch(url, { ...config, headers: requestHeaders })
  //     .then(response => response.text().then(text => ({
  //       status: response.status,
  //       statusText: response.statusText,
  //       headers: response.headers,
  //       body: text,
  //     })))
  //     .then(({ status, statusText, headers, body }) => {
  //       let json;
  //       try {
  //         json = JSON.parse(body);
  //       } catch (e) {
  //           // not json, no big deal
  //       }
  //       if (status < 200 || status >= 300) {
  //         return Promise.reject(new HttpError((json && json.message) || statusText, status));
  //       }
  //       return { status, headers, body, json };
  //     });
};

export const queryParameters = data => Object.keys(data)
    .map(key => [key, data[key]].join('='))
    .join('&');
