(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'redux', 'react-redux', 'history/createHashHistory', 'react-router-dom', 'react-router-redux', 'redux-thunk', 'redux-promise-middleware', './components/Hello', './components/Login', './components/Protected'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('redux'), require('react-redux'), require('history/createHashHistory'), require('react-router-dom'), require('react-router-redux'), require('redux-thunk'), require('redux-promise-middleware'), require('./components/Hello'), require('./components/Login'), require('./components/Protected'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.redux, global.reactRedux, global.createHashHistory, global.reactRouterDom, global.reactRouterRedux, global.reduxThunk, global.reduxPromiseMiddleware, global.Hello, global.Login, global.Protected);
    global.MtdbApp = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _redux, _reactRedux, _createHashHistory, _reactRouterDom, _reactRouterRedux, _reduxThunk, _reduxPromiseMiddleware, _Hello, _Login, _Protected) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _createHashHistory2 = _interopRequireDefault(_createHashHistory);

  var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

  var _reduxPromiseMiddleware2 = _interopRequireDefault(_reduxPromiseMiddleware);

  var _Hello2 = _interopRequireDefault(_Hello);

  var _Login2 = _interopRequireDefault(_Login);

  var _Protected2 = _interopRequireDefault(_Protected);

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

  //import Logout from './components/Logout';


  var MtdbApp = function MtdbApp(_ref) {
    var appLayout = _ref.appLayout,
        children = _ref.children,
        _ref$customReducers = _ref.customReducers,
        customReducers = _ref$customReducers === undefined ? {} : _ref$customReducers,
        customRoutes = _ref.customRoutes,
        history = _ref.history,
        restClient = _ref.restClient,
        authClient = _ref.authClient,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? 'Admin on REST' : _ref$title,
        loginPage = _ref.loginPage,
        logoutButton = _ref.logoutButton,
        initialState = _ref.initialState,
        onLogin = _ref.onLogin;

    var appReducer = (0, _redux.combineReducers)(_extends({
      routing: _reactRouterRedux.routerReducer
    }, customReducers));
    var routerHistory = history || (0, _createHashHistory2.default)();
    var middleware = (0, _redux.applyMiddleware)((0, _reduxPromiseMiddleware2.default)(), _reduxThunk2.default,
    //logger(),
    (0, _reactRouterRedux.routerMiddleware)(routerHistory));
    var store = (0, _redux.createStore)(appReducer, initialState, middleware);

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
            _react2.default.createElement(_Protected2.default, { exact: true, path: '/', isAuth: isAuth, component: _Hello2.default })
          )
        )
      )
    );
  };

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