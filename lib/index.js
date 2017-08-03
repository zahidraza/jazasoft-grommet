(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', './SimpleApp', './GApp'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('./SimpleApp'), require('./GApp'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.SimpleApp, global.GApp);
    global.index = mod.exports;
  }
})(this, function (exports, _SimpleApp, _GApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'SimpleApp', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_SimpleApp).default;
    }
  });
  Object.defineProperty(exports, 'GApp', {
    enumerable: true,
    get: function () {
      return _interopRequireDefault(_GApp).default;
    }
  });

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }
});