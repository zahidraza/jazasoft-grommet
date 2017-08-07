(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-router', '../MainRoute', './GAppHeader', './GSidebar', './TSnackbar', './GNotification', 'grommet/components/App', 'grommet/components/Split', 'grommet/components/Box', 'grommet/components/Footer', 'grommet/components/Title', 'grommet/components/Paragraph'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-router'), require('../MainRoute'), require('./GAppHeader'), require('./GSidebar'), require('./TSnackbar'), require('./GNotification'), require('grommet/components/App'), require('grommet/components/Split'), require('grommet/components/Box'), require('grommet/components/Footer'), require('grommet/components/Title'), require('grommet/components/Paragraph'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactRouter, global.MainRoute, global.GAppHeader, global.GSidebar, global.TSnackbar, global.GNotification, global.App, global.Split, global.Box, global.Footer, global.Title, global.Paragraph);
    global.GLayout = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactRouter, _MainRoute, _GAppHeader, _GSidebar, _TSnackbar, _GNotification, _App, _Split, _Box, _Footer, _Title, _Paragraph) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _MainRoute2 = _interopRequireDefault(_MainRoute);

  var _GAppHeader2 = _interopRequireDefault(_GAppHeader);

  var _GSidebar2 = _interopRequireDefault(_GSidebar);

  var _TSnackbar2 = _interopRequireDefault(_TSnackbar);

  var _GNotification2 = _interopRequireDefault(_GNotification);

  var _App2 = _interopRequireDefault(_App);

  var _Split2 = _interopRequireDefault(_Split);

  var _Box2 = _interopRequireDefault(_Box);

  var _Footer2 = _interopRequireDefault(_Footer);

  var _Title2 = _interopRequireDefault(_Title);

  var _Paragraph2 = _interopRequireDefault(_Paragraph);

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
        drawerActive: false,
        fixedSidebar: false
      };
      _this.toggleDrawer = _this.toggleDrawer.bind(_this);
      _this._onResponsive = _this._onResponsive.bind(_this);
      return _this;
    }

    _createClass(GLayout, [{
      key: '_onResponsive',
      value: function _onResponsive(param) {
        console.log(param);
        if (param == 'single') {
          this.setState({ fixedSidebar: true });
        } else {
          this.setState({ fixedSidebar: false });
        }
      }
    }, {
      key: 'toggleDrawer',
      value: function toggleDrawer() {
        this.setState({ drawerActive: !this.state.drawerActive });
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            resources = _props.resources,
            loading = _props.loading,
            appName = _props.appName,
            appShortName = _props.appShortName,
            authClient = _props.authClient,
            authenticator = _props.authenticator,
            restProps = _objectWithoutProperties(_props, ['resources', 'loading', 'appName', 'appShortName', 'authClient', 'authenticator']);

        //Create links based on authorization
        var links = [];
        resources.forEach(function (r) {
          if (authenticator.authorize(r.name)) {
            links.push({ label: r.label, path: r.name });
          }
        });

        var header = void 0;
        if (this.props.location.pathname != '/login') {
          header = _react2.default.createElement(_GAppHeader2.default, _extends({}, restProps, { authClient: authClient, appName: appName, toggleMenu: this.toggleDrawer }));
        }

        var footer = void 0;
        footer = _react2.default.createElement(
          _Footer2.default,
          { justify: 'between', pad: 'medium' },
          _react2.default.createElement(
            _Title2.default,
            null,
            'Title'
          ),
          _react2.default.createElement(
            _Box2.default,
            { direction: 'row',
              align: 'center',
              pad: { 'between': 'medium' } },
            _react2.default.createElement(
              _Paragraph2.default,
              { margin: 'none' },
              '\xA9 2016 Grommet Labs'
            )
          )
        );

        var pane1 = !this.state.drawerActive ? null : _react2.default.createElement(_GSidebar2.default, _extends({}, restProps, {
          fixed: this.state.fixedSidebar,
          links: links,
          appShortName: appShortName }));
        var pane2 = _react2.default.createElement(
          _Box2.default,
          { justify: 'between' },
          _react2.default.createElement(
            _Box2.default,
            null,
            header,
            _react2.default.createElement(_MainRoute2.default, _extends({}, restProps, { authenticator: authenticator, resources: resources }))
          )
        );

        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _App2.default,
            { centered: false },
            _react2.default.createElement(
              _Split2.default,
              { flex: 'right', showOnResponsive: 'both', onResponsive: this._onResponsive },
              pane1,
              pane2
            )
          ),
          _react2.default.createElement(_TSnackbar2.default, null),
          _react2.default.createElement(_GNotification2.default, null),
          loading && _react2.default.createElement(loading, _extends({}, restProps))
        );
      }
    }]);

    return GLayout;
  }(_react.Component);

  var componentPropType = _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]);

  GLayout.propTypes = {
    resources: _propTypes2.default.array,
    loading: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]),
    appName: _propTypes2.default.string.isRequired,
    appShortName: _propTypes2.default.string.isRequired
  };

  exports.default = (0, _reactRouter.withRouter)(GLayout);
});