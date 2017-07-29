(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./Hello"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./Hello"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Hello);
    global.index = mod.exports;
  }
})(this, function (exports, _Hello) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "Hello", {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_Hello).default;
    }
  });

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});