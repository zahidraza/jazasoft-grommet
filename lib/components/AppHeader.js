(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'grommet/components/Anchor', 'grommet/components/Button', 'grommet/components/Header', 'grommet/components/Menu', 'grommet/components/icons/base/Menu', 'grommet/components/Title'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('grommet/components/Anchor'), require('grommet/components/Button'), require('grommet/components/Header'), require('grommet/components/Menu'), require('grommet/components/icons/base/Menu'), require('grommet/components/Title'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.Anchor, global.Button, global.Header, global.Menu, global.Menu, global.Title);
    global.AppHeader = mod.exports;
  }
})(this, function (exports, _react, _Anchor, _Button, _Header, _Menu, _Menu3, _Title) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _Anchor2 = _interopRequireDefault(_Anchor);

  var _Button2 = _interopRequireDefault(_Button);

  var _Header2 = _interopRequireDefault(_Header);

  var _Menu2 = _interopRequireDefault(_Menu);

  var _Menu4 = _interopRequireDefault(_Menu3);

  var _Title2 = _interopRequireDefault(_Title);

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

  var AppHeader = function (_Component) {
    _inherits(AppHeader, _Component);

    function AppHeader() {
      _classCallCheck(this, AppHeader);

      var _this = _possibleConstructorReturn(this, (AppHeader.__proto__ || Object.getPrototypeOf(AppHeader)).call(this));

      _this.openMenu = _this.openMenu.bind(_this);
      return _this;
    }

    _createClass(AppHeader, [{
      key: 'openMenu',
      value: function openMenu() {
        console.log('Hello');
        if (this.props.onMenuOpen) {
          this.props.onMenuOpen();
        }
      }
    }, {
      key: 'render',
      value: function render() {

        var title = _react2.default.createElement(
          _Title2.default,
          null,
          _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Menu4.default, null), onClick: this.openMenu }),
          'Sample App'
        );

        var login = _react2.default.createElement(
          _Menu2.default,
          { direction: 'row', align: 'center', responsive: false },
          _react2.default.createElement(
            _Anchor2.default,
            { path: '/profile' },
            'Md Zahid Raza'
          ),
          _react2.default.createElement(
            _Anchor2.default,
            { path: '/' },
            'Logout'
          )
        );

        return _react2.default.createElement(
          _Header2.default,
          { size: 'large', justify: 'between', colorIndex: 'neutral-1-a', pad: { horizontal: 'medium' } },
          title,
          login
        );
      }
    }]);

    return AppHeader;
  }(_react.Component);

  exports.default = AppHeader;
});