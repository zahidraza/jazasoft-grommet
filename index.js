(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./SimpleApp", "./MtdbApp"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./SimpleApp"), require("./MtdbApp"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.SimpleApp, global.MtdbApp);
    global.index = mod.exports;
  }
})(this, function (exports, _SimpleApp, _MtdbApp) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "SimpleApp", {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_SimpleApp).default;
    }
  });
  Object.defineProperty(exports, "MtdbApp", {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_MtdbApp).default;
    }
  });

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});