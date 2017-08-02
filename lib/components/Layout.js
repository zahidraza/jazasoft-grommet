(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-router-dom', '../MainRoute', 'react-toolbox/lib/app_bar', 'react-toolbox/lib/navigation', 'react-toolbox/lib/font_icon'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-router-dom'), require('../MainRoute'), require('react-toolbox/lib/app_bar'), require('react-toolbox/lib/navigation'), require('react-toolbox/lib/font_icon'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactRouterDom, global.MainRoute, global.app_bar, global.navigation, global.font_icon);
    global.Layout = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactRouterDom, _MainRoute, _app_bar, _navigation, _font_icon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _MainRoute2 = _interopRequireDefault(_MainRoute);

  var _app_bar2 = _interopRequireDefault(_app_bar);

  var _navigation2 = _interopRequireDefault(_navigation);

  var _font_icon2 = _interopRequireDefault(_font_icon);

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
      _react2.default.createElement(_app_bar2.default, { title: title, leftIcon: 'menu', rightIcon: 'person' }),
      sidebar,
      _react2.default.createElement(_MainRoute2.default, { resources: resources, dashboard: dashboard })
    );
  };
  //import Link from 'react-toolbox/lib/Link';


  Layout.propTypes = {
    sidebar: _propTypes2.default.element,
    resources: _propTypes2.default.array,
    dashboard: _propTypes2.default.element,
    title: _propTypes2.default.string
  };

  exports.default = Layout;
});