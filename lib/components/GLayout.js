(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'react-router', '../MainRoute', './GAppHeader', './GSidebar', 'grommet/components/App', 'grommet/components/Split', 'grommet/components/Box'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('react-router'), require('../MainRoute'), require('./GAppHeader'), require('./GSidebar'), require('grommet/components/App'), require('grommet/components/Split'), require('grommet/components/Box'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactRouter, global.MainRoute, global.GAppHeader, global.GSidebar, global.App, global.Split, global.Box);
    global.GLayout = mod.exports;
  }
})(this, function (exports, _react, _reactRouter, _MainRoute, _GAppHeader, _GSidebar, _App, _Split, _Box) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _MainRoute2 = _interopRequireDefault(_MainRoute);

  var _GAppHeader2 = _interopRequireDefault(_GAppHeader);

  var _GSidebar2 = _interopRequireDefault(_GSidebar);

  var _App2 = _interopRequireDefault(_App);

  var _Split2 = _interopRequireDefault(_Split);

  var _Box2 = _interopRequireDefault(_Box);

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

  var TLayout = function (_Component) {
    _inherits(TLayout, _Component);

    function TLayout() {
      _classCallCheck(this, TLayout);

      var _this = _possibleConstructorReturn(this, (TLayout.__proto__ || Object.getPrototypeOf(TLayout)).call(this));

      _this.state = {
        drawerActive: false
      };
      _this._openDrawer = _this._openDrawer.bind(_this);
      _this._closeDrawer = _this._closeDrawer.bind(_this);
      return _this;
    }

    _createClass(TLayout, [{
      key: '_openDrawer',
      value: function _openDrawer() {
        this.setState({ drawerActive: true });
      }
    }, {
      key: '_closeDrawer',
      value: function _closeDrawer() {
        this.setState({ drawerActive: false });
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            resources = _props.resources,
            dashboard = _props.dashboard,
            links = _props.links;

        var header = void 0;
        if (this.props.location.pathname != '/login') {
          header = _react2.default.createElement(_GAppHeader2.default, { onMenuOpen: this._openDrawer });
        }

        var pane1 = this.state.drawerActive ? _react2.default.createElement(_GSidebar2.default, { links: links, onHide: this._closeDrawer }) : null;
        var pane2 = _react2.default.createElement(
          _Box2.default,
          null,
          header,
          _react2.default.createElement(_MainRoute2.default, { resources: resources, dashboard: dashboard })
        );

        return _react2.default.createElement(
          _App2.default,
          { centered: false },
          _react2.default.createElement(
            _Split2.default,
            { flex: 'right' },
            pane1,
            pane2
          )
        );
      }
    }]);

    return TLayout;
  }(_react.Component);

  exports.default = (0, _reactRouter.withRouter)(TLayout);
});