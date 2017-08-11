(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-redux', 'grommet/components/Box', 'grommet/components/Button', 'grommet/components/CheckBox', 'grommet/components/Table', 'grommet/components/TableRow', './GTableCell', 'grommet/components/TableHeader', 'grommet/components/List', 'grommet/components/ListItem', 'grommet/components/icons/base/Trash', './Dailog'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-redux'), require('grommet/components/Box'), require('grommet/components/Button'), require('grommet/components/CheckBox'), require('grommet/components/Table'), require('grommet/components/TableRow'), require('./GTableCell'), require('grommet/components/TableHeader'), require('grommet/components/List'), require('grommet/components/ListItem'), require('grommet/components/icons/base/Trash'), require('./Dailog'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactRedux, global.Box, global.Button, global.CheckBox, global.Table, global.TableRow, global.GTableCell, global.TableHeader, global.List, global.ListItem, global.Trash, global.Dailog);
    global.DTable = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactRedux, _Box, _Button, _CheckBox, _Table, _TableRow, _GTableCell, _TableHeader, _List, _ListItem, _Trash, _Dailog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _Box2 = _interopRequireDefault(_Box);

  var _Button2 = _interopRequireDefault(_Button);

  var _CheckBox2 = _interopRequireDefault(_CheckBox);

  var _Table2 = _interopRequireDefault(_Table);

  var _TableRow2 = _interopRequireDefault(_TableRow);

  var _GTableCell2 = _interopRequireDefault(_GTableCell);

  var _TableHeader2 = _interopRequireDefault(_TableHeader);

  var _List2 = _interopRequireDefault(_List);

  var _ListItem2 = _interopRequireDefault(_ListItem);

  var _Trash2 = _interopRequireDefault(_Trash);

  var _Dailog2 = _interopRequireDefault(_Dailog);

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

  var cellWidth = {
    small: 100,
    medium: 150,
    large: 200,
    xlarge: 250
  };

  var cellBasis = {
    small: '1/4',
    medium: '1/2',
    large: '3/4',
    xlarge: '3/4'
  };

  var DTable = function (_Component) {
    _inherits(DTable, _Component);

    function DTable() {
      _classCallCheck(this, DTable);

      return _possibleConstructorReturn(this, (DTable.__proto__ || Object.getPrototypeOf(DTable)).call(this));
    }

    _createClass(DTable, [{
      key: '_onRemove',
      value: function _onRemove(index) {
        if (this.props.onRemove) {
          this.props.onRemove(index);
        }
      }
    }, {
      key: '_onInputChange',
      value: function _onInputChange(index, name, action, event) {
        if (action) {
          action(index, name, event);
        }
      }
    }, {
      key: '_onToggleChange',
      value: function _onToggleChange(index, name, action, event) {
        if (action) {
          action(index, name, event);
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            headers = _props.headers,
            elements = _props.elements,
            removeControl = _props.removeControl,
            container = _props.container;


        var contents = void 0;
        if (container == 'table') {
          var rowItems = elements.map(function (rowItem, idx) {

            var colItems = rowItem.map(function (colItem, i) {
              var cell = void 0;
              if (colItem.type == 'label') {
                var _width = colItem.width == undefined ? cellWidth.medium : cellWidth[colItem.width];
                cell = _react2.default.createElement(
                  _GTableCell2.default,
                  { key: i },
                  _react2.default.createElement(
                    'h4',
                    { style: { marginTop: 15, width: _width } },
                    colItem.label
                  )
                );
              }
              if (colItem.type == 'input') {
                var _width2 = colItem.width == undefined ? cellWidth.medium : cellWidth[colItem.width];
                cell = _react2.default.createElement(
                  _GTableCell2.default,
                  { key: i },
                  _react2.default.createElement('input', { type: 'text', name: colItem.name, value: colItem.value, style: { width: _width2 }, onChange: _this2._onInputChange.bind(_this2, idx, colItem.name, colItem.action) })
                );
              }
              if (colItem.type == 'checkbox') {
                var _width3 = colItem.width == undefined ? cellWidth.medium : cellWidth[colItem.width];
                cell = _react2.default.createElement(
                  _GTableCell2.default,
                  { key: i },
                  _react2.default.createElement(_CheckBox2.default, { label: colItem.label, checked: colItem.value, toggle: true, onChange: _this2._onToggleChange.bind(_this2, idx, colItem.name, colItem.action) })
                );
              }
              return cell;
            });

            if (removeControl) {
              colItems.push(_react2.default.createElement(
                _GTableCell2.default,
                { key: colItems.length, style: { textAlign: 'right' } },
                _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Trash2.default, null), onClick: _this2._onRemove.bind(_this2, idx) }),
                ' '
              ));
            }

            return _react2.default.createElement(
              _TableRow2.default,
              { key: idx },
              colItems
            );
          });

          var header = void 0;
          if (headers != undefined) {
            if (removeControl) {
              header = _react2.default.createElement(
                'thead',
                null,
                _react2.default.createElement(
                  'tr',
                  null,
                  headers.map(function (h, i) {
                    var cell = void 0;
                    if (i == headers.length - 1) {
                      cell = _react2.default.createElement(
                        'th',
                        { key: i, style: { textAlign: 'right' } },
                        h
                      );
                    } else {
                      cell = _react2.default.createElement(
                        'th',
                        { key: i },
                        h
                      );
                    }
                    return cell;
                  })
                )
              );
            } else {
              header = _react2.default.createElement(_TableHeader2.default, { labels: headers });
            }
          }

          if (elements.length != 0) {
            contents = _react2.default.createElement(
              _Table2.default,
              null,
              header,
              _react2.default.createElement(
                'tbody',
                null,
                rowItems
              )
            );
          }
        }

        if (container == 'list') {
          var _rowItems = elements.map(function (rowItem, idx) {

            var colItems = rowItem.map(function (colItem, i) {
              var cell = void 0;
              if (colItem.type == 'label') {
                var basis = colItem.width == undefined ? cellBasis.medium : cellBasis[colItem.width];
                cell = _react2.default.createElement(
                  _Box2.default,
                  { key: i, basis: basis, alignSelf: 'center' },
                  colItem.label
                );
              }
              if (colItem.type == 'input') {
                var _basis = colItem.width == undefined ? cellBasis.medium : cellBasis[colItem.width];
                cell = _react2.default.createElement(
                  _Box2.default,
                  { key: i, basis: _basis, alignSelf: 'center' },
                  _react2.default.createElement('input', { type: 'text', name: colItem.name, value: colItem.value, style: { width: width }, onChange: _this2._onInputChange.bind(_this2, idx, colItem.name, colItem.action) })
                );
              }
              if (colItem.type == 'checkbox') {
                var _basis2 = colItem.width == undefined ? cellBasis.medium : cellBasis[colItem.width];
                cell = _react2.default.createElement(
                  _Box2.default,
                  { key: i, basis: _basis2, alignSelf: 'center' },
                  _react2.default.createElement(_CheckBox2.default, { label: colItem.label, checked: colItem.value, toggle: true, onChange: _this2._onToggleChange.bind(_this2, idx, colItem.name, colItem.action) })
                );
              }
              return cell;
            });

            if (removeControl) {
              colItems.push(_react2.default.createElement(
                _Box2.default,
                { key: colItems.length, basis: 'xsmall', align: 'end' },
                _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Trash2.default, null), onClick: _this2._onRemove.bind(_this2, idx) }),
                ' '
              ));
            }

            return _react2.default.createElement(
              _ListItem2.default,
              { key: idx, pad: { horizontal: 'none' } },
              _react2.default.createElement(
                _Box2.default,
                { full: 'horizontal', alignSelf: 'center', direction: 'row', justify: 'between' },
                colItems
              )
            );
          });

          contents = _react2.default.createElement(
            _List2.default,
            null,
            _rowItems
          );
        }

        return _react2.default.createElement(
          _Box2.default,
          null,
          contents
        );
      }
    }]);

    return DTable;
  }(_react.Component);

  var headerType = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]);

  DTable.propTypes = {
    headers: _propTypes2.default.arrayOf(String),
    elements: _propTypes2.default.array.isRequired,
    removeControl: _propTypes2.default.bool,
    onRemove: _propTypes2.default.func,
    container: _propTypes2.default.oneOf(['table', 'list'])
  };

  DTable.defaultProps = {
    removeControl: false,
    container: 'table'
  };

  var select = function select(store) {
    return { form: store.form, err: store.err };
  };

  exports.default = (0, _reactRedux.connect)(select)(DTable);
});