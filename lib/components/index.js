(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./GHeader"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./GHeader"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.GHeader);
    global.index = mod.exports;
  }
})(this, function (exports, _GHeader) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "GHeader", {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_GHeader).default;
    }
  });

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});