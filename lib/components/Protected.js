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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Protected = function (_Component) {
    _inherits(Protected, _Component);

    function Protected() {
      _classCallCheck(this, Protected);

      return _possibleConstructorReturn(this, (Protected.__proto__ || Object.getPrototypeOf(Protected)).apply(this, arguments));
    }

    _createClass(Protected, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            authenticator = _props.authenticator,
            path = _props.path,
            exact = _props.exact,
            component = _props.component,
            restProps = _objectWithoutProperties(_props, ['authenticator', 'path', 'exact', 'component']);

        var ex = exact == undefined ? false : exact;
        return _react2.default.createElement(_reactRouterDom.Route, { exact: ex, path: path, render: function render(props) {
            var result = void 0;
            if (authenticator.authenticate()) {
              if (authenticator.authorize(path)) {
                result = _react2.default.createElement(component, _extends({ authenticator: authenticator }, props, restProps));
              } else {
                result = _react2.default.createElement(_reactRouterDom.Redirect, { to: '/' });
              }
            } else {
              result = _react2.default.createElement(_reactRouterDom.Redirect, { to: '/login' });
            }
            return result;
          } });
      }
    }]);

    return Protected;
  }(_react.Component);

  Protected.propTypes = {
    component: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]).isRequired,
    authenticator: _propTypes2.default.object.isRequired,
    path: _propTypes2.default.string.isRequired
  };

  exports.default = Protected;
});