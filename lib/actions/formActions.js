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
  var FORM_CHANGE_BASIC = exports.FORM_CHANGE_BASIC = 'FORM_CHANGE_BASIC';
  var FORM_CHANGE_COLLECTION = exports.FORM_CHANGE_COLLECTION = 'FORM_CHANGE_COLLECTION';
  var FORM_CLEAR = exports.FORM_CLEAR = 'FORM_CLEAR';
});