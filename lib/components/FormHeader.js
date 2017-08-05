(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'grommet/components/Box', 'grommet/components/Header', 'grommet/components/Heading', 'grommet/components/icons/Spinning'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('grommet/components/Box'), require('grommet/components/Header'), require('grommet/components/Heading'), require('grommet/components/icons/Spinning'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.Box, global.Header, global.Heading, global.Spinning);
    global.FormHeader = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _Box, _Header, _Heading, _Spinning) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _Box2 = _interopRequireDefault(_Box);

  var _Header2 = _interopRequireDefault(_Header);

  var _Heading2 = _interopRequireDefault(_Heading);

  var _Spinning2 = _interopRequireDefault(_Spinning);

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

  var FormHeader = function (_Component) {
    _inherits(FormHeader, _Component);

    function FormHeader() {
      _classCallCheck(this, FormHeader);

      return _possibleConstructorReturn(this, (FormHeader.__proto__ || Object.getPrototypeOf(FormHeader)).apply(this, arguments));
    }

    _createClass(FormHeader, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            title = _props.title,
            busy = _props.busy;

        return _react2.default.createElement(
          _Header2.default,
          { justify: 'between' },
          _react2.default.createElement(
            _Heading2.default,
            { tag: 'h3', strong: true },
            title
          ),
          _react2.default.createElement(
            _Box2.default,
            { pad: { horizontal: 'small' } },
            busy ? _react2.default.createElement(_Spinning2.default, null) : null
          )
        );
      }
    }]);

    return FormHeader;
  }(_react.Component);

  FormHeader.propTypes = {
    title: _propTypes2.default.string.isRequired,
    busy: _propTypes2.default.bool
  };

  FormHeader.defaultProps = {
    busy: false
  };

  exports.default = FormHeader;
});