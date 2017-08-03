(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.authTypes = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var AUTH_LOGIN = exports.AUTH_LOGIN = 'AUTH_LOGIN';
  var AUTH_LOGOUT = exports.AUTH_LOGOUT = 'AUTH_LOGOUT';
});