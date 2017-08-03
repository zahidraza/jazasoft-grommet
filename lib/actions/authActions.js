(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../rest/authTypes'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../rest/authTypes'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.authTypes);
    global.authActions = mod.exports;
  }
})(this, function (exports, _authTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.userLogout = exports.userLogin = exports.USER_LOGOUT = exports.AUTH_FAILURE = exports.AUTH_SUCCESS = exports.AUTH_PROGRESS = exports.USER_LOGIN = undefined;
  var USER_LOGIN = exports.USER_LOGIN = 'USER_LOGIN';
  var AUTH_PROGRESS = exports.AUTH_PROGRESS = 'AUTH_PROGRESS';
  var AUTH_SUCCESS = exports.AUTH_SUCCESS = 'AUTH_SUCCESS';
  var AUTH_FAILURE = exports.AUTH_FAILURE = 'AUTH_FAILURE';
  var USER_LOGOUT = exports.USER_LOGOUT = 'USER_LOGOUT';

  var userLogin = exports.userLogin = function userLogin(authClient, username, password) {
    var params = {
      grant_type: 'password',
      username: username,
      password: password
    };

    return function (dispatch) {
      dispatch({ type: AUTH_PROGRESS });
      authClient(_authTypes.AUTH_LOGIN, params).then(function (response) {
        if (response.status == 200) {
          sessionStorage.authenticated = true;
          sessionStorage.username = username;
          var resp = response.json;
          sessionStorage.accessToken = resp.access_token;
          sessionStorage.refreshToken = resp.refresh_token;

          dispatch({ type: AUTH_SUCCESS });
        }
      });
    };
  };

  var userLogout = exports.userLogout = function userLogout(authClient) {

    return function (dispatch) {
      delete sessionStorage.authenticated;
      delete sessionStorage.accessToken;
      delete sessionStorage.refreshToken;
      dispatch({ type: USER_LOGOUT });
      // authClient(AUTH_LOGIN, params)
      // .then(response => {
      //   if (response.status == 200) {
      //     sessionStorage.authenticated = true;
      //     sessionStorage.username = username;
      //     const resp = response.json;
      //     sessionStorage.accessToken = resp.access_token;
      //     sessionStorage.refreshToken = resp.refresh_token;

      //     dispatch({type: AUTH_SUCCESS});
      //   }
      // });
    };
  };
});