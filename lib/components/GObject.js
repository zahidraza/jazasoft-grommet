(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-router-dom', '../utils/utility', 'grommet/components/Box', 'grommet/components/Button', 'grommet/components/Footer', 'grommet/components/List', 'grommet/components/ListItem'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-router-dom'), require('../utils/utility'), require('grommet/components/Box'), require('grommet/components/Button'), require('grommet/components/Footer'), require('grommet/components/List'), require('grommet/components/ListItem'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactRouterDom, global.utility, global.Box, global.Button, global.Footer, global.List, global.ListItem);
    global.GObject = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactRouterDom, _utility, _Box, _Button, _Footer, _List, _ListItem) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _Box2 = _interopRequireDefault(_Box);

  var _Button2 = _interopRequireDefault(_Button);

  var _Footer2 = _interopRequireDefault(_Footer);

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

      var _this = _possibleConstructorReturn(this, (GObject.__proto__ || Object.getPrototypeOf(GObject)).call(this));

      _this._onClick = _this._onClick.bind(_this);
      return _this;
    }

    _createClass(GObject, [{
      key: '_onClick',
      value: function _onClick(action) {
        if (action == 'back' && this.props.backUrl != undefined) {
          this.props.history.push(this.props.backUrl);
        }
        if (action == 'edit' && this.props.editUrl != undefined) {
          this.props.history.push(this.props.editUrl);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
            data = _props.data,
            collectionData = _props.collectionData,
            column = _props.column,
            width = _props.width,
            colorIndex = _props.colorIndex,
            boldKey = _props.boldKey,
            backUrl = _props.backUrl,
            editUrl = _props.editUrl;


        var content1 = void 0,
            content2 = void 0;
        if (data != undefined) {
          var items = [];
          var keyWeight = boldKey ? 'bold' : 'normal';
          if (column > 1) {
            for (var i = 0; i < data.length; i += column) {
              var cells = [];
              for (var j = i; j < i + column; j++) {

                cells.push(_react2.default.createElement(
                  _Box2.default,
                  { basis: '3/4', key: 10 * j, style: { fontWeight: keyWeight } },
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
          }
          if (column == 1) {
            data.forEach(function (e, idx) {
              var item = _react2.default.createElement(
                _ListItem2.default,
                { key: idx, justify: 'between', pad: { vertical: 'small', horizontal: 'small' } },
                _react2.default.createElement(
                  'span',
                  { style: { fontWeight: keyWeight } },
                  ' ',
                  e.key,
                  ' '
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'secondary' },
                  e.value
                )
              );
              items.push(item);
            });
          }

          content1 = _react2.default.createElement(
            _Box2.default,
            { colorIndex: colorIndex, size: width, alignSelf: 'center', justify: 'center', margin: { vertical: 'medium' } },
            _react2.default.createElement(
              _List2.default,
              null,
              items
            )
          );
        }
        var collections = [];
        if (collectionData != undefined) {

          collectionData.forEach(function (e, idx) {
            var rows = [];
            var item = _react2.default.createElement(
              _ListItem2.default,
              { key: idx, justify: 'between', pad: { vertical: 'small', horizontal: 'small' } },
              _react2.default.createElement(
                'span',
                null,
                ' ',
                e.key,
                ' '
              ),
              _react2.default.createElement('span', { className: 'secondary' })
            );
            rows.push(item);

            e.values.forEach(function (v, i) {
              var key = void 0,
                  value = void 0;
              if (typeof v == 'string') {
                value = v;
              } else {
                key = v.key;
                value = v.value;
              }
              var item = _react2.default.createElement(
                _ListItem2.default,
                { key: 100 * idx + i + 100, justify: 'between', pad: { vertical: 'small', horizontal: 'small' } },
                _react2.default.createElement(
                  'span',
                  null,
                  key != undefined ? (0, _utility.splitCamelCase)(key) : '',
                  ' '
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'secondary' },
                  ' ',
                  value,
                  ' '
                )
              );
              rows.push(item);
            });
            var row = _react2.default.createElement(
              _Box2.default,
              { key: idx, colorIndex: colorIndex, size: width, alignSelf: 'center', justify: 'center', margin: { vertical: 'medium' } },
              _react2.default.createElement(
                _List2.default,
                null,
                rows
              )
            );
            collections.push(row);
          });
        }

        var footer = void 0;
        if (backUrl != undefined || editUrl != undefined) {
          var justify = 'center';
          if (backUrl != undefined && editUrl != undefined) {
            justify = 'between';
          }
          var editControl = editUrl != undefined ? _react2.default.createElement(_Button2.default, { label: 'Edit', onClick: this._onClick.bind(this, 'edit') }) : null;
          var backControl = backUrl != undefined ? _react2.default.createElement(_Button2.default, { label: 'Back', onClick: this._onClick.bind(this, 'back') }) : null;
          footer = _react2.default.createElement(
            _Footer2.default,
            { pad: { 'vertical': 'medium' }, justify: justify },
            editControl,
            backControl
          );
        }

        return _react2.default.createElement(
          _Box2.default,
          { alignSelf: 'center' },
          content1,
          collections,
          footer
        );
      }
    }]);

    return GObject;
  }(_react.Component);

  var headerType = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]);

  GObject.propTypes = {
    data: _propTypes2.default.array,
    column: _propTypes2.default.number,
    collectionData: _propTypes2.default.array,
    width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
    colorIndex: _propTypes2.default.string,
    boldKey: _propTypes2.default.bool,
    backUrl: _propTypes2.default.string,
    editUrl: _propTypes2.default.string
  };

  GObject.defaultProps = {
    column: 1,
    width: 'xlarge',
    colorIndex: 'light-1',
    boldKey: false
  };

  exports.default = (0, _reactRouterDom.withRouter)(GObject);
});