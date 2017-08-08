(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'grommet/components/Box', 'grommet/components/Button', 'grommet/components/Header', 'grommet/components/Heading', 'grommet/components/Layer'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('grommet/components/Box'), require('grommet/components/Button'), require('grommet/components/Header'), require('grommet/components/Heading'), require('grommet/components/Layer'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.Box, global.Button, global.Header, global.Heading, global.Layer);
    global.Dailog = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _Box, _Button, _Header, _Heading, _Layer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _Box2 = _interopRequireDefault(_Box);

  var _Button2 = _interopRequireDefault(_Button);

  var _Header2 = _interopRequireDefault(_Header);

  var _Heading2 = _interopRequireDefault(_Heading);

  var _Layer2 = _interopRequireDefault(_Layer);

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

  var Dailog = function (_Component) {
    _inherits(Dailog, _Component);

    function Dailog() {
      _classCallCheck(this, Dailog);

      return _possibleConstructorReturn(this, (Dailog.__proto__ || Object.getPrototypeOf(Dailog)).apply(this, arguments));
    }

    _createClass(Dailog, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            active = _props.active,
            title = _props.title;

        return _react2.default.createElement(
          _Layer2.default,
          { hidden: !active, flush: true },
          _react2.default.createElement(
            _Box2.default,
            { size: 'medium', margin: { vertical: 'small', horizontal: 'medium' } },
            _react2.default.createElement(
              _Box2.default,
              null,
              _react2.default.createElement(
                _Header2.default,
                null,
                _react2.default.createElement(
                  _Heading2.default,
                  { tag: 'h3' },
                  title
                )
              )
            ),
            _react2.default.createElement(
              _Box2.default,
              null,
              this.props.children
            ),
            _react2.default.createElement(
              _Box2.default,
              { pad: { vertical: 'medium' }, direction: 'row', justify: 'end' },
              _react2.default.createElement(
                _Box2.default,
                null,
                _react2.default.createElement(_Button2.default, { label: 'Cancel', plain: true, onClick: this.props.onCancel })
              ),
              _react2.default.createElement(
                _Box2.default,
                null,
                _react2.default.createElement(_Button2.default, { label: 'Submit', plain: true, onClick: this.props.onSubmit })
              )
            )
          )
        );
      }
    }]);

    return Dailog;
  }(_react.Component);

  Dailog.propTypes = {
    active: _propTypes2.default.bool.isRequired,
    title: _propTypes2.default.string.isRequired,
    onSubmit: _propTypes2.default.func.isRequired,
    onCancel: _propTypes2.default.func.isRequired
  };

  exports.default = Dailog;
});