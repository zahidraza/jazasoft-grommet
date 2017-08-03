(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-router-dom', 'react-redux', '../actions/authActions', 'grommet/components/App', 'grommet/components/Box', 'grommet/components/Heading', 'grommet/components/Form', 'grommet/components/FormField', 'grommet/components/FormFields', 'grommet/components/Button', 'grommet/components/Footer'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-router-dom'), require('react-redux'), require('../actions/authActions'), require('grommet/components/App'), require('grommet/components/Box'), require('grommet/components/Heading'), require('grommet/components/Form'), require('grommet/components/FormField'), require('grommet/components/FormFields'), require('grommet/components/Button'), require('grommet/components/Footer'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactRouterDom, global.reactRedux, global.authActions, global.App, global.Box, global.Heading, global.Form, global.FormField, global.FormFields, global.Button, global.Footer);
    global.Login = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactRouterDom, _reactRedux, _authActions, _App, _Box, _Heading, _Form, _FormField, _FormFields, _Button, _Footer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _App2 = _interopRequireDefault(_App);

  var _Box2 = _interopRequireDefault(_Box);

  var _Heading2 = _interopRequireDefault(_Heading);

  var _Form2 = _interopRequireDefault(_Form);

  var _FormField2 = _interopRequireDefault(_FormField);

  var _FormFields2 = _interopRequireDefault(_FormFields);

  var _Button2 = _interopRequireDefault(_Button);

  var _Footer2 = _interopRequireDefault(_Footer);

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

  var Login = function (_Component) {
    _inherits(Login, _Component);

    function Login() {
      _classCallCheck(this, Login);

      var _this = _possibleConstructorReturn(this, (Login.__proto__ || Object.getPrototypeOf(Login)).call(this));

      _this.state = {
        email: '',
        password: ''
      };
      _this._onChange = _this._onChange.bind(_this);
      _this._onLogin = _this._onLogin.bind(_this);
      return _this;
    }

    _createClass(Login, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.auth.authenticated) {
          this.props.history.push('/');
        }
      }
    }, {
      key: '_onChange',
      value: function _onChange(event) {
        var attr = event.target.getAttribute('name');
        if (attr === 'email') {
          this.setState({ email: event.target.value });
        }
        if (attr === 'password') {
          this.setState({ password: event.target.value });
        }
      }
    }, {
      key: '_onLogin',
      value: function _onLogin() {
        var _state = this.state,
            email = _state.email,
            password = _state.password;

        console.log(email);

        this.props.dispatch((0, _authActions.userLogin)(this.props.authClient, this.state.email, this.state.password));
      }
    }, {
      key: 'render',
      value: function render() {
        var _state2 = this.state,
            email = _state2.email,
            password = _state2.password;

        return _react2.default.createElement(
          _App2.default,
          null,
          _react2.default.createElement(
            _Box2.default,
            { pad: { horizontal: 'large', vertical: 'large' }, wrap: true, full: 'vertical' },
            _react2.default.createElement(
              _Box2.default,
              { align: 'end', justify: 'end', pad: { 'horizontal': 'large', vertical: 'large', between: 'large' } },
              _react2.default.createElement(
                _Box2.default,
                { size: 'auto', align: 'center', separator: 'all', justify: 'center', colorIndex: 'light-1', pad: { 'horizontal': 'medium', vertical: 'medium', between: 'medium' } },
                _react2.default.createElement(
                  _Heading2.default,
                  null,
                  this.props.title
                ),
                _react2.default.createElement(
                  _Form2.default,
                  null,
                  _react2.default.createElement(
                    _FormFields2.default,
                    null,
                    _react2.default.createElement(
                      _FormField2.default,
                      { label: 'Email' },
                      _react2.default.createElement('input', { type: 'text', name: 'email', value: email, onChange: this._onChange })
                    ),
                    _react2.default.createElement(
                      _FormField2.default,
                      { label: 'Password' },
                      _react2.default.createElement('input', { type: 'password', name: 'password', value: password, onChange: this._onChange })
                    )
                  ),
                  _react2.default.createElement(
                    _Footer2.default,
                    { pad: { 'vertical': 'small' } },
                    _react2.default.createElement(_Button2.default, { label: 'Login', fill: true, primary: true, onClick: this._onLogin })
                  )
                )
              )
            )
          )
        );
      }
    }]);

    return Login;
  }(_react.Component);

  Login.propTypes = {
    title: _propTypes2.default.string.isRequired,
    onLogin: _propTypes2.default.func
  };

  Login.defaultProps = {
    title: 'Sample Application'
  };

  var select = function select(store) {
    return { routing: store.routing, auth: store.auth };
  };

  exports.default = (0, _reactRouterDom.withRouter)((0, _reactRedux.connect)(select)(Login));
});