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
    global.formActions = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var FORM_CHANGE = exports.FORM_CHANGE = 'FORM_CHANGE';
  var FORM_CLEAR = exports.FORM_CLEAR = 'FORM_CLEAR';
});