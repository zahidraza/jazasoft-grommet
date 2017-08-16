(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-redux', 'grommet/components/Box', 'grommet/components/List', 'grommet/components/ListItem'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-redux'), require('grommet/components/Box'), require('grommet/components/List'), require('grommet/components/ListItem'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactRedux, global.Box, global.List, global.ListItem);
    global.GObject = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactRedux, _Box, _List, _ListItem) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _Box2 = _interopRequireDefault(_Box);

  var _List2 = _interopRequireDefault(_List);

  var _ListItem2 = _interopRequireDefault(_ListItem);

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

  var GObject = function (_Component) {
    _inherits(GObject, _Component);

    function GObject() {
      _classCallCheck(this, GObject);

      return _possibleConstructorReturn(this, (GObject.__proto__ || Object.getPrototypeOf(GObject)).call(this));
    }

    _createClass(GObject, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            data = _props.data,
            column = _props.column,
            width = _props.width,
            colorIndex = _props.colorIndex;


        var items = [];
        for (var i = 0; i < data.length; i += column) {
          var cells = [];
          for (var j = i; j < i + column; j++) {
            cells.push(_react2.default.createElement(
              _Box2.default,
              { basis: '3/4', key: 10 * j, style: { fontWeight: 'bold' } },
              data[j] != undefined ? data[j].key : ''
            ));
            cells.push(_react2.default.createElement(
              _Box2.default,
              { basis: '3/4', key: 10 * j + 1 },
              data[j] != undefined ? data[j].value : ''
            ));
          }
          var row = _react2.default.createElement(
            _ListItem2.default,
            { key: i },
            _react2.default.createElement(
              _Box2.default,
              { full: 'horizontal', alignSelf: 'center', direction: 'row', justify: 'between' },
              cells
            )
          );
          items.push(row);
        }

        var contents = void 0;

        return _react2.default.createElement(
          _Box2.default,
          { colorIndex: colorIndex, size: width, alignSelf: 'center', justify: 'center', margin: { vertical: 'medium' } },
          _react2.default.createElement(
            _List2.default,
            null,
            items
          )
        );
      }
    }]);

    return GObject;
  }(_react.Component);

  var headerType = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]);

  GObject.propTypes = {
    data: _propTypes2.default.array.isRequired,
    column: _propTypes2.default.number,
    width: _propTypes2.default.oneOfType(_propTypes2.default.string, _propTypes2.default.object),
    colorIndex: _propTypes2.default.string
  };

  GObject.defaultProps = {
    column: 2,
    width: 'xlarge',
    colorIndex: 'light-1'
  };

  var select = function select(store) {
    return { filter: store.filter };
  };

  exports.default = (0, _reactRedux.connect)(select)(GObject);
});