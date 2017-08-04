import HttpError from './HttpError';

export const fetchJson = (url, options = {}) => {
  const requestHeaders = options.headers || new Headers({
    Accept: 'application/json',
  });
  // if (!(options && options.body && options.body instanceof FormData)) {
  //   requestHeaders.set('Content-Type', 'application/json');
  // }
  if (options && options.body) {
    requestHeaders.set('Content-Type', 'application/json');
  }
  if (sessionStorage.authenticated && sessionStorage.accessToken) {
    requestHeaders.set('Authorization', 'Bearer ' + sessionStorage.accessToken);
  }

  return fetch(url, { ...options, headers: requestHeaders })
      .then(response => response.text().then(text => ({
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        body: text,
      })))
      .then(({ status, statusText, headers, body }) => {
        let json;
        try {
          json = JSON.parse(body);
        } catch (e) {
            // not json, no big deal
        }
        if (status < 200 || status >= 300) {
          return Promise.reject(new HttpError((json && json.message) || statusText, status));
        }
        return { status, headers, body, json };
      });
};

export const queryParameters = data => Object.keys(data)
    .map(key => [key, data[key]].join('='))
    .join('&');
