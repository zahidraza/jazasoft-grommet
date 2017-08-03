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
    global.Protected = mod.exports;
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

  var Protected = function Protected(_ref) {
    var isAuth = _ref.isAuth,
        component = _ref.component,
        rest = _objectWithoutProperties(_ref, ['isAuth', 'component']);

    return _react2.default.createElement(_reactRouterDom.Route, _extends({}, rest, { render: function render(props) {
        return isAuth() ? _react2.default.createElement(component, _extends({}, props, rest)) : _react2.default.createElement(_reactRouterDom.Redirect, { to: '/login' });
      } }));
  };

  Protected.propTypes = {
    component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.element]).isRequired,
    isAuth: _propTypes2.default.func.isRequired
  };

  exports.default = Protected;
});