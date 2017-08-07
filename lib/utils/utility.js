(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
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
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
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
});