(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-router-dom', './SubRoute', './components/Protected'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-router-dom'), require('./SubRoute'), require('./components/Protected'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactRouterDom, global.SubRoute, global.Protected);
    global.MainRoute = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactRouterDom, _SubRoute, _Protected) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _SubRoute2 = _interopRequireDefault(_SubRoute);

  var _Protected2 = _interopRequireDefault(_Protected);

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

  var MainRoute = function MainRoute(_ref) {
    var _ref$resources = _ref.resources,
        resources = _ref$resources === undefined ? [] : _ref$resources,
        authenticator = _ref.authenticator,
        restProps = _objectWithoutProperties(_ref, ['resources', 'authenticator']);

    return _react2.default.createElement(
      _reactRouterDom.Switch,
      null,
      resources.map(function (resource, idx) {
        if (idx != 0) {
          var element = function element() {
            return _react2.default.createElement(_SubRoute2.default, _extends({ basePath: resource.name, routes: resource.routes }, restProps));
          };
          return _react2.default.createElement(_Protected2.default, { key: idx, path: '/' + resource.name,
            authenticator: authenticator,
            component: element
          });
        }
      }),
      _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: resources[0].routes[0].component })
    );
  };

  MainRoute.propTypes = {
    resources: _propTypes2.default.array
  };

  exports.default = MainRoute;
});