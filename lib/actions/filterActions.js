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
    global.filterActions = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var FILTER_APPLY = exports.FILTER_APPLY = 'FILTER_APPLY';
  var FILTER_COUNT = exports.FILTER_COUNT = 'FILTER_COUNT';
  var FILTER_CLEAR = exports.FILTER_CLEAR = 'FILTER_CLEAR';
});