(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-router-dom'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-router-dom'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactRouterDom);
    global.SubRoute = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactRouterDom) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var SubRoute = function SubRoute(_ref) {
    var basePath = _ref.basePath,
        _ref$routes = _ref.routes,
        routes = _ref$routes === undefined ? [] : _ref$routes;

    var items = routes.map(function (route, index) {
      var path = '/' + basePath + '/' + route.path;
      return _react2.default.createElement(_reactRouterDom.Route, { exact: true, key: path, path: path, component: route.component });
    });
    return _react2.default.createElement(
      _reactRouterDom.Switch,
      null,
      items
    );
  };

  SubRoute.prototype = {
    basePath: _propTypes2.default.string.isRequired,
    routes: _propTypes2.default.array
  };

  exports.default = SubRoute;
});