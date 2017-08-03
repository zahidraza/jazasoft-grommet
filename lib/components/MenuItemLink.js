(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'grommet/components/Anchor', 'react-router'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('grommet/components/Anchor'), require('react-router'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.Anchor, global.reactRouter);
    global.MenuItemLink = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _Anchor, _reactRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MenuItemLink = undefined;

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _Anchor2 = _interopRequireDefault(_Anchor);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
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

  var MenuItemLink = exports.MenuItemLink = function (_Component) {
    _inherits(MenuItemLink, _Component);

    function MenuItemLink() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, MenuItemLink);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MenuItemLink.__proto__ || Object.getPrototypeOf(MenuItemLink)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function () {
        _this.props.history.push(_this.props.to);
        if (_this.props.onClick) {
          _this.props.onClick();
        }
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(MenuItemLink, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(_Anchor2.default, { className: this.props.className, label: this.props.label, onClick: this.handleClick });
      }
    }]);

    return MenuItemLink;
  }(_react.Component);

  MenuItemLink.propTypes = {
    history: _propTypes2.default.object.isRequired,
    onClick: _propTypes2.default.func,
    to: _propTypes2.default.string.isRequired,
    label: _propTypes2.default.string.isRequired,
    className: _propTypes2.default.string
  };
  exports.default = (0, _reactRouter.withRouter)(MenuItemLink);
});