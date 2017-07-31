(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-router-dom', './SubRoute'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-router-dom'), require('./SubRoute'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactRouterDom, global.SubRoute);
    global.MainRoute = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactRouterDom, _SubRoute) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _SubRoute2 = _interopRequireDefault(_SubRoute);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var MainRoute = function MainRoute(_ref) {
    var _ref$resources = _ref.resources,
        resources = _ref$resources === undefined ? [] : _ref$resources,
        dashboard = _ref.dashboard;

    return _react2.default.createElement(
      _reactRouterDom.Switch,
      null,
      resources.map(function (resource) {
        return _react2.default.createElement(_reactRouterDom.Route, {
          path: '/' + resource.name,
          key: resource.name,
          render: function render() {
            return _react2.default.createElement(_SubRoute2.default, {
              basePath: resource.name,
              routes: resource.routes
            });
          }
        });
      }),
      dashboard ? _react2.default.createElement(_reactRouterDom.Route, {
        exact: true,
        path: '/',
        render: function render(routeProps) {
          return _react2.default.createElement(dashboard);
        }
      }) : resources[0] && _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', render: function render() {
          return _react2.default.createElement(_reactRouterDom.Redirect, { to: '/' + resources[0].name });
        } })
    );
  };

  MainRoute.prototype = {
    dashboard: _propTypes2.default.element,
    resources: _propTypes2.default.array
  };

  exports.default = MainRoute;
});