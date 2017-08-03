(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-router', '../MainRoute', './GAppHeader', './GSidebar', 'grommet/components/App', 'grommet/components/Split', 'grommet/components/Box'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-router'), require('../MainRoute'), require('./GAppHeader'), require('./GSidebar'), require('grommet/components/App'), require('grommet/components/Split'), require('grommet/components/Box'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactRouter, global.MainRoute, global.GAppHeader, global.GSidebar, global.App, global.Split, global.Box);
    global.GLayout = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactRouter, _MainRoute, _GAppHeader, _GSidebar, _App, _Split, _Box) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

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

  var GLayout = function (_Component) {
    _inherits(GLayout, _Component);

    function GLayout() {
      _classCallCheck(this, GLayout);

      var _this = _possibleConstructorReturn(this, (GLayout.__proto__ || Object.getPrototypeOf(GLayout)).call(this));

      _this.state = {
        drawerActive: false
      };
      _this._openDrawer = _this._openDrawer.bind(_this);
      _this._closeDrawer = _this._closeDrawer.bind(_this);
      return _this;
    }

    _createClass(GLayout, [{
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
            links = _props.links,
            appName = _props.appName,
            appShortName = _props.appShortName,
            authClient = _props.authClient,
            restProps = _objectWithoutProperties(_props, ['resources', 'dashboard', 'links', 'appName', 'appShortName', 'authClient']);

        var header = void 0;
        if (this.props.location.pathname != '/login') {
          header = _react2.default.createElement(_GAppHeader2.default, _extends({}, restProps, { authClient: authClient, appName: appName, onMenuOpen: this._openDrawer }));
        }

        var pane1 = this.state.drawerActive ? _react2.default.createElement(_GSidebar2.default, _extends({}, restProps, { links: links, appShortName: appShortName, onHide: this._closeDrawer })) : null;
        var pane2 = _react2.default.createElement(
          _Box2.default,
          null,
          header,
          _react2.default.createElement(_MainRoute2.default, _extends({}, restProps, { resources: resources, dashboard: dashboard }))
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

    return GLayout;
  }(_react.Component);

  GLayout.propTypes = {
    resources: _propTypes2.default.array,
    dashboard: _propTypes2.default.element,
    appName: _propTypes2.default.string.isRequired,
    appShortName: _propTypes2.default.string.isRequired,
    links: _propTypes2.default.array.isRequired
  };

  exports.default = (0, _reactRouter.withRouter)(GLayout);
});