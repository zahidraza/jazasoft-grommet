(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'react-redux', '../actions/notificationActions', 'react-toolbox/lib/snackbar'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('react-redux'), require('../actions/notificationActions'), require('react-toolbox/lib/snackbar'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.reactRedux, global.notificationActions, global.snackbar);
    global.TSnackbar = mod.exports;
  }
})(this, function (exports, _react, _reactRedux, _notificationActions, _snackbar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _snackbar2 = _interopRequireDefault(_snackbar);

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

  var TSnackbar = function (_Component) {
    _inherits(TSnackbar, _Component);

    function TSnackbar() {
      _classCallCheck(this, TSnackbar);

      var _this = _possibleConstructorReturn(this, (TSnackbar.__proto__ || Object.getPrototypeOf(TSnackbar)).call(this));

      _this.state = {
        active: false,
        message: '',
        duration: 'short'
      };
      _this.clearSnackbar = _this.clearSnackbar.bind(_this);
      return _this;
    }

    _createClass(TSnackbar, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.nfn.showSnackbar) {
          var snackbar = nextProps.nfn.snackbar;

          var duration = 'short';
          if (snackbar.duration && snackbar.duration == 'long') {
            duration = 'long';
          }
          this.setState({ active: true, message: snackbar.message, duration: duration });
        } else {
          this.setState({ active: false });
        }
      }
    }, {
      key: 'clearSnackbar',
      value: function clearSnackbar() {
        this.props.dispatch({ type: _notificationActions.CLEAR_SNACKBAR });
      }
    }, {
      key: 'render',
      value: function render() {
        var _state = this.state,
            active = _state.active,
            message = _state.message,
            duration = _state.duration;

        var timeout = duration == 'short' ? 2000 : 5000;
        return _react2.default.createElement(_snackbar2.default, {
          action: 'Dismiss',
          active: active,
          label: message,
          timeout: timeout,
          onClick: this.clearSnackbar,
          onTimeout: this.clearSnackbar,
          type: 'cancel'
        });
      }
    }]);

    return TSnackbar;
  }(_react.Component);

  var select = function select(store) {
    return { nfn: store.nfn };
  };

  exports.default = (0, _reactRedux.connect)(select)(TSnackbar);
});