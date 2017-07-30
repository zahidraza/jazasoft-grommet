(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "react", "react-bootstrap/lib/Modal", "react-bootstrap/lib/Button"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("react"), require("react-bootstrap/lib/Modal"), require("react-bootstrap/lib/Button"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.Modal, global.Button);
    global.Dialog = mod.exports;
  }
})(this, function (exports, _react, _Modal, _Button) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _Modal2 = _interopRequireDefault(_Modal);

  var _Button2 = _interopRequireDefault(_Button);

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

  var Dialog = function (_Component) {
    _inherits(Dialog, _Component);

    function Dialog() {
      _classCallCheck(this, Dialog);

      var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this));

      _this.state = {
        show: true
      };
      _this.close = _this.close.bind(_this);
      return _this;
    }

    _createClass(Dialog, [{
      key: "close",
      value: function close() {
        this.setState({ show: false });
      }
    }, {
      key: "render",
      value: function render() {
        return _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            _Modal2.default,
            { show: this.state.show, onHide: this.close },
            _react2.default.createElement(
              _Modal2.default.Header,
              { closeButton: true },
              _react2.default.createElement(
                _Modal2.default.Title,
                null,
                "Modal heading"
              )
            ),
            _react2.default.createElement(
              _Modal2.default.Body,
              null,
              _react2.default.createElement(
                "h4",
                null,
                "Text in a modal"
              )
            ),
            _react2.default.createElement(
              _Modal2.default.Footer,
              null,
              _react2.default.createElement(
                _Button2.default,
                { onClick: this.close },
                "Close"
              )
            )
          )
        );
      }
    }]);

    return Dialog;
  }(_react.Component);

  exports.default = Dialog;
});