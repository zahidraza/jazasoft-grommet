(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', './MenuItemLink'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('./MenuItemLink'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.MenuItemLink);
    global.GSidebar = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _MenuItemLink) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _MenuItemLink2 = _interopRequireDefault(_MenuItemLink);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var GSidebar = function GSidebar(_ref) {
    var links = _ref.links;

    var items = links.map(function (link, index) {
      return _react2.default.createElement(_MenuItemLink2.default, { key: index, to: '/' + link.path, label: link.label });
    });
    return _react2.default.createElement(
      'div',
      null,
      items
    );
  };

  GSidebar.propTypes = {
    links: _propTypes2.default.array
  };

  exports.default = GSidebar;
});