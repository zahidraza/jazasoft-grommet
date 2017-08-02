(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-router-dom', 'react-router', '../MainRoute', './MenuItemLink', './GSidebar', './GHeader', 'grommet/components/Anchor', 'grommet/components/App', 'grommet/components/Box', 'grommet/components/Menu', 'grommet/components/Split'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-router-dom'), require('react-router'), require('../MainRoute'), require('./MenuItemLink'), require('./GSidebar'), require('./GHeader'), require('grommet/components/Anchor'), require('grommet/components/App'), require('grommet/components/Box'), require('grommet/components/Menu'), require('grommet/components/Split'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactRouterDom, global.reactRouter, global.MainRoute, global.MenuItemLink, global.GSidebar, global.GHeader, global.Anchor, global.App, global.Box, global.Menu, global.Split);
    global.AppLayout = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactRouterDom, _reactRouter, _MainRoute, _MenuItemLink, _GSidebar, _GHeader, _Anchor, _App, _Box, _Menu, _Split) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _MainRoute2 = _interopRequireDefault(_MainRoute);

  var _MenuItemLink2 = _interopRequireDefault(_MenuItemLink);

  var _GSidebar2 = _interopRequireDefault(_GSidebar);

  var _GHeader2 = _interopRequireDefault(_GHeader);

  var _Anchor2 = _interopRequireDefault(_Anchor);

  var _App2 = _interopRequireDefault(_App);

  var _Box2 = _interopRequireDefault(_Box);

  var _Menu2 = _interopRequireDefault(_Menu);

  var _Split2 = _interopRequireDefault(_Split);

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

  var AppLayout = function (_React$Component) {
    _inherits(AppLayout, _React$Component);

    function AppLayout() {
      _classCallCheck(this, AppLayout);

      return _possibleConstructorReturn(this, (AppLayout.__proto__ || Object.getPrototypeOf(AppLayout)).apply(this, arguments));
    }

    _createClass(AppLayout, [{
      key: 'render',
      value: function render() {
        // const { resources, dashboard, links } = this.props;
        // let header;
        // if (this.props.location.pathname != '/login') {
        //   header = <AppHeader onMenuOpen={this.openDrawer} />;
        // }

        // var pane1 = this.state.drawerActive ? <GSidebar links={links} onClose={this.closeDrawer} /> : null;
        // var pane2 =  (
        //   <Box>
        //     {header}
        //     <MainRoute resources={resources} dashboard={dashboard}/>
        //   </Box>
        // );


        return _react2.default.createElement(
          _App2.default,
          { centered: false },
          _react2.default.createElement(
            _Split2.default,
            { flex: 'right' },
            _react2.default.createElement(_GSidebar2.default, null),
            _react2.default.createElement(
              _Box2.default,
              null,
              _react2.default.createElement(_GHeader2.default, null)
            )
          )
        );
      }
    }]);

    return AppLayout;
  }(_react2.default.Component);

  AppLayout.propTypes = {
    sidebar: _propTypes2.default.element,
    resources: _propTypes2.default.array,
    dashboard: _propTypes2.default.element,
    title: _propTypes2.default.string
  };

  exports.default = (0, _reactRouter.withRouter)(AppLayout);
});