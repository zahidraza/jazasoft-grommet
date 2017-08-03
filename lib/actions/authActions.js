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
  exports.userLogin = exports.USER_LOGIN_SUCCESS = exports.USER_LOGIN_FAILURE = exports.USER_LOGIN_LOADING = exports.USER_LOGIN = undefined;
  var USER_LOGIN = exports.USER_LOGIN = 'USER_LOGIN';
  var USER_LOGIN_LOADING = exports.USER_LOGIN_LOADING = 'USER_LOGIN_LOADING';
  var USER_LOGIN_FAILURE = exports.USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
  var USER_LOGIN_SUCCESS = exports.USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';

  var userLogin = exports.userLogin = function userLogin(authClient, username, password) {
    var params = {
      grant_type: 'password',
      username: username,
      password: password
    };

    return function (dispatch) {

      authClient(_authTypes.AUTH_LOGIN, params).then(function (response) {
        console.log(response);
      });
    };
  };
});