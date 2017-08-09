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
    global.utility = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.capitalize = capitalize;
  exports.splitCamelCase = splitCamelCase;
  exports.getArrayFromCsv = getArrayFromCsv;
  /**
   * @return {Array}  returns array of roles
   */
  var getRoles = exports.getRoles = function getRoles() {
    if (sessionStorage.authorities) {
      var authorities = JSON.parse(sessionStorage.authorities);
      return authorities.map(function (a) {
        return a.authority;
      });
    }
    return [];
  };

  function capitalize(param) {
    return param.charAt(0).toUpperCase() + param.slice(1);
  }

  function splitCamelCase(param) {
    var result = param.charAt(0).toUpperCase() + param.slice(1);
    result = result.replace(/([A-Z])/g, ' $1').slice(1);
    return result;
  }

  function getArrayFromCsv(csv) {
    if (csv == undefined) return [];
    return csv.split(/\s*,\s*/);
  }
});