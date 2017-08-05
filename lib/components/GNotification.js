(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-redux', '../actions/notificationActions', 'grommet/components/Layer', 'grommet/components/Notification'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-redux'), require('../actions/notificationActions'), require('grommet/components/Layer'), require('grommet/components/Notification'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactRedux, global.notificationActions, global.Layer, global.Notification);
    global.GNotification = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactRedux, _notificationActions, _Layer, _Notification) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _Layer2 = _interopRequireDefault(_Layer);

  var _Notification2 = _interopRequireDefault(_Notification);

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

  var GNotification = function (_Component) {
    _inherits(GNotification, _Component);

    function GNotification() {
      _classCallCheck(this, GNotification);

      var _this = _possibleConstructorReturn(this, (GNotification.__proto__ || Object.getPrototypeOf(GNotification)).call(this));

      _this.state = {
        hidden: true,
        message: '',
        status: 'unknown'
      };

      _this.clearNotification = _this.clearNotification.bind(_this);
      return _this;
    }

    _createClass(GNotification, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.nfn.showNotification) {
          var nfn = nextProps.nfn.notification;
          console.log(nfn);
          var status = 'unknown';
          if (nfn.status) {
            status = nfn.status;
          }
          this.setState({ hidden: false, message: nfn.message, status: status });
        } else {
          this.setState({ hidden: true });
        }
      }
    }, {
      key: 'clearNotification',
      value: function clearNotification() {
        this.props.dispatch({ type: _notificationActions.CLEAR_NOTIFICATION });
      }
    }, {
      key: 'render',
      value: function render() {
        var _state = this.state,
            hidden = _state.hidden,
            message = _state.message,
            status = _state.status;

        return _react2.default.createElement(
          _Layer2.default,
          { hidden: hidden, closer: true, onClose: this.clearNotification },
          _react2.default.createElement(_Notification2.default, {
            margin: { horizontal: 'none', vertical: 'large' },
            size: 'medium',
            message: message,
            status: status
          })
        );
      }
    }]);

    return GNotification;
  }(_react.Component);

  var select = function select(store) {
    return { nfn: store.nfn };
  };

  exports.default = (0, _reactRedux.connect)(select)(GNotification);
});