(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./Hello", "./Dialog"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./Hello"), require("./Dialog"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Hello, global.Dialog);
    global.index = mod.exports;
  }
})(this, function (exports, _Hello, _Dialog) {
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
  Object.defineProperty(exports, "Dialog", {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_Dialog).default;
    }
  });

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});