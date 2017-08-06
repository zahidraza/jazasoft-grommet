(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', '../rest/authTypes', '../rest/types', './notificationActions'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('../rest/authTypes'), require('../rest/types'), require('./notificationActions'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.authTypes, global.types, global.notificationActions);
    global.authActions = mod.exports;
  }
})(this, function (exports, _authTypes, _types, _notificationActions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.userLogout = exports.userProfile = exports.userLogin = exports.USER_LOGOUT = exports.AUTH_FAILURE = exports.AUTH_SUCCESS = exports.PROFILE_SUCCESS = exports.LOGIN_SUCCESS = exports.AUTH_PROGRESS = exports.USER_LOGIN = undefined;
  var USER_LOGIN = exports.USER_LOGIN = 'USER_LOGIN';
  var AUTH_PROGRESS = exports.AUTH_PROGRESS = 'AUTH_PROGRESS';
  var LOGIN_SUCCESS = exports.LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  var PROFILE_SUCCESS = exports.PROFILE_SUCCESS = 'PROFILE_SUCCESS';
  var AUTH_SUCCESS = exports.AUTH_SUCCESS = 'AUTH_SUCCESS';
  var AUTH_FAILURE = exports.AUTH_FAILURE = 'AUTH_FAILURE';
  var USER_LOGOUT = exports.USER_LOGOUT = 'USER_LOGOUT';

  var userLogin = exports.userLogin = function userLogin(authClient, username, password) {
    var params = {
      grant_type: 'password',
      username: username,
      password: password
    };
    var options = { params: params };

    return function (dispatch) {
      dispatch({ type: AUTH_PROGRESS });
      authClient(_authTypes.AUTH_LOGIN, options).then(function (response) {
        if (response.status == 200) {
          sessionStorage.username = username;
          var resp = response.data;
          sessionStorage.accessToken = resp.access_token;
          sessionStorage.refreshToken = resp.refresh_token;
          dispatch({ type: LOGIN_SUCCESS });
        }
      }).catch(function (error) {
        if (error.response.status == 400) {
          dispatch({ type: AUTH_FAILURE, payload: { message: 'Incorrect Username or password. Try again!' } });
        } else {
          dispatch({ type: AUTH_FAILURE, payload: { message: 'Some Error occured. Try again later!' } });
        }
      });
    };
  };

  var userProfile = exports.userProfile = function userProfile(restClient, username) {
    var params = { username: username };
    var options = { params: params };
    var resource = 'users/profile';
    return function (dispatch) {
      restClient(_types.GET_LIST, resource, options, dispatch).then(function (response) {
        console.log(response);
        if (response.status == 200) {
          sessionStorage.authenticated = true;
          var user = response.data;
          sessionStorage.name = user.name;
          sessionStorage.email = user.email;
          sessionStorage.mobile = user.mobile;
          sessionStorage.authorities = JSON.stringify(user.authorities);
          sessionStorage.permissions = JSON.stringify(user.permissions);
          sessionStorage.company = JSON.stringify(user.company);
          dispatch({ type: PROFILE_SUCCESS });
          dispatch({ type: AUTH_SUCCESS });
        }
      }).catch(function (error) {
        if (error.response.status == 403) {
          dispatch({ type: AUTH_FAILURE, payload: { message: 'Access Denied. Contact Administrator.' } });
          dispatch({ type: _notificationActions.CLEAR_SNACKBAR });
        } else {
          dispatch({ type: AUTH_FAILURE, payload: { message: 'Some Error occured. Try again later!' } });
        }
      });
    };
  };

  var userLogout = exports.userLogout = function userLogout(authClient) {

    return function (dispatch) {
      delete sessionStorage.authenticated;
      delete sessionStorage.accessToken;
      delete sessionStorage.refreshToken;
      delete sessionStorage.name;
      delete sessionStorage.email;
      delete sessionStorage.mobile;
      delete sessionStorage.authorities;
      delete sessionStorage.permissions;

      dispatch({ type: USER_LOGOUT });
    };
  };
});