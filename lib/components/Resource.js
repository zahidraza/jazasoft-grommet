(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes);
    global.Resource = mod.exports;
  }
})(this, function (exports, _react, _propTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var componentPropType = _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.string]);

  var Resource = function Resource() {
    return _react2.default.createElement(
      'span',
      null,
      '<Resource> elements are for configuration only and should not be rendered'
    );
  };

  Resource.propTypes = {
    label: _propTypes2.default.string.isRequired,
    name: _propTypes2.default.string.isRequired,
    routes: _propTypes2.default.array,
    reducer: _propTypes2.default.func
  };

  Resource.defaultProps = {};

  exports.default = Resource;
});