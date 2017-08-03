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

  var _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  function _objectWithoutProperties(obj, keys) {
    var target = {};

    for (var i in obj) {
      if (keys.indexOf(i) >= 0) continue;
      if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
      target[i] = obj[i];
    }

    return target;
  }

  var SubRoute = function SubRoute(_ref) {
    var basePath = _ref.basePath,
        _ref$routes = _ref.routes,
        routes = _ref$routes === undefined ? [] : _ref$routes,
        restProps = _objectWithoutProperties(_ref, ['basePath', 'routes']);

    var items = routes.map(function (route, index) {
      var path = '/' + basePath + '/' + route.path;
      return _react2.default.createElement(_reactRouterDom.Route, { exact: true, key: path, path: path,
        render: function render(props) {
          return _react2.default.createElement(route.component, _extends({}, props, restProps));
        }
      });
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