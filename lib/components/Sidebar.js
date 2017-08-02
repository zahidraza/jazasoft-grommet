(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-toolbox/lib/drawer', 'react-toolbox/lib/button', './MenuItemLink'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-toolbox/lib/drawer'), require('react-toolbox/lib/button'), require('./MenuItemLink'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.drawer, global.button, global.MenuItemLink);
    global.Sidebar = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _drawer, _button, _MenuItemLink) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _drawer2 = _interopRequireDefault(_drawer);

  var _button2 = _interopRequireDefault(_button);

  var _MenuItemLink2 = _interopRequireDefault(_MenuItemLink);

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

  var Sidebar = function (_React$Component) {
    _inherits(Sidebar, _React$Component);

    function Sidebar() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, Sidebar);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Sidebar.__proto__ || Object.getPrototypeOf(Sidebar)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        active: false
      }, _this.handleToggle = function () {
        _this.setState({ active: !_this.state.active });
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Sidebar, [{
      key: 'render',
      value: function render() {
        var links = this.props.links;

        var items = links.map(function (link, index) {
          return _react2.default.createElement(_MenuItemLink2.default, { key: index, to: '/' + link.path, label: link.label });
        });
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_button2.default, { label: 'Show Drawer', raised: true, accent: true, onClick: this.handleToggle }),
          _react2.default.createElement(
            _drawer2.default,
            { active: this.state.active, onOverlayClick: this.handleToggle },
            _react2.default.createElement(
              'h5',
              null,
              'This is your Drawer.'
            ),
            _react2.default.createElement(
              'p',
              null,
              'You can embed any content you want, for example a Menu.'
            ),
            items
          )
        );
      }
    }]);

    return Sidebar;
  }(_react2.default.Component);

  Sidebar.propTypes = {
    links: _propTypes2.default.array
  };

  exports.default = Sidebar;
});