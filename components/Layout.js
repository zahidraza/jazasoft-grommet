(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'react-router-dom', '../MainRoute'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('react-router-dom'), require('../MainRoute'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactRouterDom, global.MainRoute);
    global.Layout = mod.exports;
  }
})(this, function (exports, _react, _reactRouterDom, _MainRoute) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _MainRoute2 = _interopRequireDefault(_MainRoute);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var Layout = function Layout(_ref) {
    var sidebar = _ref.sidebar,
        _ref$resources = _ref.resources,
        resources = _ref$resources === undefined ? [] : _ref$resources,
        dashboard = _ref.dashboard,
        title = _ref.title;

    return _react2.default.createElement(
      'div',
      null,
      sidebar,
      _react2.default.createElement(_MainRoute2.default, { resources: resources, dashboard: dashboard })
    );
  };

  Layout.propTypes = {
    sidebar: _react.PropTypes.element,
    resources: _react.PropTypes.array,
    dashboard: _react.PropTypes.element,
    title: _react.PropTypes.string
  };

  exports.default = Layout;
});