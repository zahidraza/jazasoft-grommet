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
    global.errActions = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var BAD_REQUEST = exports.BAD_REQUEST = 'BAD_REQUEST';
  var CLEAR_ERROR = exports.CLEAR_ERROR = 'CLEAR_ERROR';
  var ACCESS_DENIED = exports.ACCESS_DENIED = 'ACCESS_DENIED';
});