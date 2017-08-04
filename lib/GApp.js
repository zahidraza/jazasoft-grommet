(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'redux', 'react-redux', 'history/createHashHistory', 'react-router-dom', 'react-router-redux', './reducers/routerReducer', './reducers/authReducer', 'redux-logger', 'redux-thunk', 'redux-promise-middleware', './components/Dashboard', './components/Login', './components/Protected', './components/GLayout', 'grommet/components/App'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('redux'), require('react-redux'), require('history/createHashHistory'), require('react-router-dom'), require('react-router-redux'), require('./reducers/routerReducer'), require('./reducers/authReducer'), require('redux-logger'), require('redux-thunk'), require('redux-promise-middleware'), require('./components/Dashboard'), require('./components/Login'), require('./components/Protected'), require('./components/GLayout'), require('grommet/components/App'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.redux, global.reactRedux, global.createHashHistory, global.reactRouterDom, global.reactRouterRedux, global.routerReducer, global.authReducer, global.reduxLogger, global.reduxThunk, global.reduxPromiseMiddleware, global.Dashboard, global.Login, global.Protected, global.GLayout, global.App);
    global.GApp = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _redux, _reactRedux, _createHashHistory, _reactRouterDom, _reactRouterRedux, _routerReducer, _authReducer, _reduxLogger, _reduxThunk, _reduxPromiseMiddleware, _Dashboard, _Login, _Protected, _GLayout, _App) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

  var _authReducer2 = _interopRequireDefault(_authReducer);

  var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

  var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

  var _reduxPromiseMiddleware2 = _interopRequireDefault(_reduxPromiseMiddleware);

  var _Dashboard2 = _interopRequireDefault(_Dashboard);

  var _Login2 = _interopRequireDefault(_Login);

  var _Protected2 = _interopRequireDefault(_Protected);

  var _GLayout2 = _interopRequireDefault(_GLayout);

  var _App2 = _interopRequireDefault(_App);

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

  var GApp = function GApp(_ref) {
    var appLayout = _ref.appLayout,
        dashboard = _ref.dashboard,
        children = _ref.children,
        _ref$customReducers = _ref.customReducers,
        customReducers = _ref$customReducers === undefined ? {} : _ref$customReducers,
        customRoutes = _ref.customRoutes,
        history = _ref.history,
        restClient = _ref.restClient,
        authClient = _ref.authClient,
        _ref$appName = _ref.appName,
        appName = _ref$appName === undefined ? 'Sample App' : _ref$appName,
        appShortName = _ref.appShortName,
        loginPage = _ref.loginPage,
        logoutButton = _ref.logoutButton,
        initialState = _ref.initialState,
        onLogin = _ref.onLogin;

    //Props which should pass down to all components
    var restProps = { restClient: restClient };

    var resources = _react2.default.Children.map(children, function (_ref2) {
      var props = _ref2.props;
      return props;
    }) || [];
    var links = resources.map(function (r) {
      return { label: r.label, path: r.name };
    });
    var reducers = {
      routing: _routerReducer.routerReducer,
      auth: _authReducer2.default
    };
    resources.forEach(function (resource) {
      if (resource.reducer) {
        reducers[resource.name] = resource.reducer;
      }
    });
    var appReducer = (0, _redux.combineReducers)(reducers);
    var routerHistory = history || (0, _createHashHistory2.default)();
    var middleware = (0, _redux.applyMiddleware)((0, _reduxPromiseMiddleware2.default)(), _reduxThunk2.default, _reduxLogger2.default);
    //const store = createStore(appReducer, initialState, middleware);
    var store = (0, _redux.createStore)(appReducer, middleware);
    if (!appLayout) {
      appLayout = _GLayout2.default;
    }

    //const logout = authClient ? createElement(logoutButton || Logout) : null;
    var isAuth = function isAuth() {
      return window.sessionStorage.authenticated == true || window.sessionStorage.authenticated == 'true' ? true : false;
    };
    return _react2.default.createElement(
      _reactRedux.Provider,
      { store: store },
      _react2.default.createElement(
        _reactRouterRedux.ConnectedRouter,
        { history: routerHistory },
        _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _reactRouterDom.Switch,
            null,
            _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/login', render: function render(props) {
                return !isAuth() ? (0, _react.createElement)(loginPage || _Login2.default, { location: location, appName: appName, authClient: authClient, restClient: restClient }, null) : _react2.default.createElement(_reactRouterDom.Redirect, { to: {
                    pathname: '/',
                    state: { from: props.location }
                  } });
              } }),
            _react2.default.createElement(_Protected2.default, _extends({ path: '/', isAuth: isAuth, component: appLayout,
              dashboard: dashboard,
              links: links,
              resources: resources,
              appName: appName,
              appShortName: appShortName,
              authClient: authClient
            }, restProps))
          )
        )
      )
    );
  };

  var componentPropType = _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]);

  GApp.propTypes = {
    appLayout: componentPropType,
    authClient: _propTypes2.default.func,
    children: _propTypes2.default.node,
    customReducers: _propTypes2.default.object,
    customRoutes: _propTypes2.default.array,
    history: _propTypes2.default.object,
    loginPage: componentPropType,
    logoutButton: componentPropType,
    restClient: _propTypes2.default.func,
    appName: _propTypes2.default.string.isRequired,
    appShortName: _propTypes2.default.string.isRequired,
    initialState: _propTypes2.default.object,
    onLogin: _propTypes2.default.func,
    abc: _propTypes2.default.node
  };

  exports.default = GApp;
});