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
    global.notificationActions = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var SHOW_NOTIFICATION = exports.SHOW_NOTIFICATION = 'SHOW_NOTIFICATION';
  var CLEAR_NOTIFICATION = exports.CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';
  var SHOW_SNACKBAR = exports.SHOW_SNACKBAR = 'SHOW_SNACKBAR';
  var CLEAR_SNACKBAR = exports.CLEAR_SNACKBAR = 'CLEAR_SNACKBAR';
});