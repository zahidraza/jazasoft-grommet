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
    global.types = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var GET_LIST = exports.GET_LIST = 'GET_LIST';
  var GET_ONE = exports.GET_ONE = 'GET_ONE';
  var GET_MANY = exports.GET_MANY = 'GET_MANY';
  //export const GET_MANY_REFERENCE = 'GET_MANY_REFERENCE';
  var CREATE = exports.CREATE = 'CREATE';
  var UPDATE = exports.UPDATE = 'UPDATE';
  var DELETE = exports.DELETE = 'DELETE';
});