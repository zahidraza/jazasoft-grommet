(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'redux', 'react-redux', 'history/createHashHistory', 'react-router-dom', 'react-router-redux', './reducers/routerReducer', 'redux-logger', 'redux-thunk', 'redux-promise-middleware', './components/Hello', './components/Login', './components/Protected', './components/GSidebar', './components/Layout'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('redux'), require('react-redux'), require('history/createHashHistory'), require('react-router-dom'), require('react-router-redux'), require('./reducers/routerReducer'), require('redux-logger'), require('redux-thunk'), require('redux-promise-middleware'), require('./components/Hello'), require('./components/Login'), require('./components/Protected'), require('./components/GSidebar'), require('./components/Layout'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.redux, global.reactRedux, global.createHashHistory, global.reactRouterDom, global.reactRouterRedux, global.routerReducer, global.reduxLogger, global.reduxThunk, global.reduxPromiseMiddleware, global.Hello, global.Login, global.Protected, global.GSidebar, global.Layout);
    global.MtdbApp = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _redux, _reactRedux, _createHashHistory, _reactRouterDom, _reactRouterRedux, _routerReducer, _reduxLogger, _reduxThunk, _reduxPromiseMiddleware, _Hello, _Login, _Protected, _GSidebar, _Layout) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

  var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

  var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

  var _reduxPromiseMiddleware2 = _interopRequireDefault(_reduxPromiseMiddleware);

  var _Hello2 = _interopRequireDefault(_Hello);

  var _Login2 = _interopRequireDefault(_Login);

  var _Protected2 = _interopRequireDefault(_Protected);

  var _GSidebar2 = _interopRequireDefault(_GSidebar);

  var _Layout2 = _interopRequireDefault(_Layout);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  //import Logout from './components/Logout';
  var MtdbApp = function MtdbApp(_ref) {
    var appLayout = _ref.appLayout,
        dashboard = _ref.dashboard,
        sidebar = _ref.sidebar,
        children = _ref.children,
        _ref$customReducers = _ref.customReducers,
        customReducers = _ref$customReducers === undefined ? {} : _ref$customReducers,
        customRoutes = _ref.customRoutes,
        history = _ref.history,
        restClient = _ref.restClient,
        authClient = _ref.authClient,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? 'Sample App' : _ref$title,
        loginPage = _ref.loginPage,
        logoutButton = _ref.logoutButton,
        initialState = _ref.initialState,
        onLogin = _ref.onLogin;

    var resources = _react2.default.Children.map(children, function (_ref2) {
      var props = _ref2.props;
      return props;
    }) || [];
    var links = resources.map(function (r) {
      return { label: r.label, path: r.name };
    });
    var reducers = {
      routing: _routerReducer.routerReducer
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

    //const logout = authClient ? createElement(logoutButton || Logout) : null;
    var isAuth = function isAuth() {
      return window.sessionStorage.isLoggedIn == true || window.sessionStorage.isLoggedIn == 'true' ? true : false;
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
                return !(window.sessionStorage.isLoggedIn == true || window.sessionStorage.isLoggedIn == 'true') ? (0, _react.createElement)(loginPage || _Login2.default, { location: location, title: title, onLogin: onLogin }, null) : _react2.default.createElement(_reactRouterDom.Redirect, { to: {
                    pathname: '/',
                    state: { from: props.location }
                  } });
              } }),
            _react2.default.createElement(_reactRouterDom.Route, { path: '/', render: function render() {
                return (0, _react.createElement)(appLayout || _Layout2.default, {
                  dashboard: dashboard,
                  sidebar: (0, _react.createElement)(sidebar || _GSidebar2.default, { links: links }),
                  resources: resources,
                  title: title
                });
              } })
          )
        )
      )
    );
  };

  //import Dashboard from './components/Dashboard';


  var componentPropType = _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]);

  MtdbApp.propTypes = {
    appLayout: componentPropType,
    authClient: _propTypes2.default.func,
    children: _propTypes2.default.node,
    customReducers: _propTypes2.default.object,
    customRoutes: _propTypes2.default.array,
    history: _propTypes2.default.object,
    loginPage: componentPropType,
    logoutButton: componentPropType,
    restClient: _propTypes2.default.func,
    title: _propTypes2.default.string.isRequired,
    initialState: _propTypes2.default.object,
    onLogin: _propTypes2.default.func,
    abc: _propTypes2.default.node
  };

  exports.default = MtdbApp;
});