(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-redux', '../utils/utility', '../actions/filterActions', 'grommet/components/Box', 'grommet/components/Button', 'grommet/components/Table', 'grommet/components/TableRow', 'grommet/components/TableHeader', './GTableCell', 'grommet/components/List', 'grommet/components/ListItem', 'react-toolbox/lib/tooltip'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-redux'), require('../utils/utility'), require('../actions/filterActions'), require('grommet/components/Box'), require('grommet/components/Button'), require('grommet/components/Table'), require('grommet/components/TableRow'), require('grommet/components/TableHeader'), require('./GTableCell'), require('grommet/components/List'), require('grommet/components/ListItem'), require('react-toolbox/lib/tooltip'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactRedux, global.utility, global.filterActions, global.Box, global.Button, global.Table, global.TableRow, global.TableHeader, global.GTableCell, global.List, global.ListItem, global.tooltip);
    global.GTable = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactRedux, _utility, _filterActions, _Box, _Button, _Table, _TableRow, _TableHeader, _GTableCell, _List, _ListItem, _tooltip) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _Box2 = _interopRequireDefault(_Box);

  var _Button2 = _interopRequireDefault(_Button);

  var _Table2 = _interopRequireDefault(_Table);

  var _TableRow2 = _interopRequireDefault(_TableRow);

  var _TableHeader2 = _interopRequireDefault(_TableHeader);

  var _GTableCell2 = _interopRequireDefault(_GTableCell);

  var _List2 = _interopRequireDefault(_List);

  var _ListItem2 = _interopRequireDefault(_ListItem);

  var _tooltip2 = _interopRequireDefault(_tooltip);

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

  var THeadTooltip = (0, _tooltip2.default)('th');

  var GTable = function (_Component) {
    _inherits(GTable, _Component);

    function GTable() {
      _classCallCheck(this, GTable);

      var _this = _possibleConstructorReturn(this, (GTable.__proto__ || Object.getPrototypeOf(GTable)).call(this));

      _this.state = {
        page: 1,
        data: [],
        filteredTotal: 0
      };

      _this._loadData = _this._loadData.bind(_this);
      _this._onMore = _this._onMore.bind(_this);
      return _this;
    }

    _createClass(GTable, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _props = this.props,
            data = _props.data,
            headers = _props.headers,
            filter = _props.filter.filter;

        this._loadData(data, filter, this.state.page);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        var data = nextProps.data,
            _nextProps$filter = nextProps.filter,
            filter = _nextProps$filter.filter,
            toggleCount = _nextProps$filter.toggleCount;

        if (this.props.filter.toggleCount == toggleCount) {
          this._loadData(data, filter, this.state.page);
        }
      }
    }, {
      key: '_loadData',
      value: function _loadData(data, filter, page) {
        var unfilteredTotal = data.length;

        var _loop = function _loop(key) {
          if ({}.hasOwnProperty.call(filter, key)) {
            var selectedFilter = filter[key];
            //handle case where data filter field has comma separated multiple values
            data = data.filter(function (d) {
              var result = false;
              (0, _utility.getArrayFromCsv)(d[key]).forEach(function (item) {
                if (selectedFilter.includes(item)) result = true;
              });
              return result;
            });
          }
        };

        for (var key in filter) {
          _loop(key);
        }
        var filteredTotal = data.length;
        data = data.slice(0, page * this.props.pageSize);
        this.setState({ data: data, page: page, filteredTotal: filteredTotal });
        this.props.dispatch({ type: _filterActions.FILTER_COUNT, payload: { filteredTotal: filteredTotal, unfilteredTotal: unfilteredTotal } });
      }
    }, {
      key: '_onMore',
      value: function _onMore() {
        var _props2 = this.props,
            data = _props2.data,
            filter = _props2.filter.filter;

        this._loadData(data, filter, this.state.page + 1);
      }
    }, {
      key: 'render',
      value: function render() {
        var _state = this.state,
            data = _state.data,
            filteredTotal = _state.filteredTotal;
        var headers = this.props.headers;


        var tableHeaders = [],
            keys = [];
        headers.forEach(function (h) {
          if (typeof h === 'string') {
            tableHeaders.push(h);
            keys.push(h);
          } else {
            var label = h.label,
                tooltip = h.tooltip,
                key = h.key;

            tableHeaders.push({ label: label, tooltip: tooltip });
            keys.push(key);
          }
        });

        var onMore = void 0;
        if (data.length < filteredTotal) {
          onMore = this._onMore;
        }

        var contents = void 0;
        if (this.props.container == 'table') {

          var header = tableHeaders.map(function (h, i) {
            var result = void 0;
            if (typeof h === 'string') {
              result = _react2.default.createElement(
                'th',
                null,
                h
              );
            } else {
              var tooltip = h.tooltip;
              if (tooltip != undefined) {
                result = _react2.default.createElement(
                  THeadTooltip,
                  { key: i, tooltipPosition: 'top', tooltip: tooltip },
                  ' ',
                  h.label
                );
              } else {
                result = _react2.default.createElement(
                  'th',
                  null,
                  h.label
                );
              }
            }
            return result;
          });

          var items = data.map(function (item, idx) {
            var cells = keys.map(function (key, i) {
              return _react2.default.createElement(
                _GTableCell2.default,
                { key: i },
                item[key]
              );
            });
            return _react2.default.createElement(
              _TableRow2.default,
              { key: idx },
              cells
            );
          });

          contents = _react2.default.createElement(
            _Table2.default,
            { onMore: onMore },
            _react2.default.createElement(
              'thead',
              null,
              _react2.default.createElement(
                'tr',
                null,
                header
              )
            ),
            _react2.default.createElement(
              'tbody',
              null,
              items
            )
          );
        }

        if (this.props.container == 'list') {
          var _items = data.map(function (item, idx) {
            var cells = keys.map(function (key, i) {
              return _react2.default.createElement(
                _Box2.default,
                { basis: '3/4', key: i },
                item[key]
              );
            });
            return _react2.default.createElement(
              _ListItem2.default,
              { key: idx },
              _react2.default.createElement(
                _Box2.default,
                { full: 'horizontal', alignSelf: 'center', direction: 'row', justify: 'between' },
                cells
              )
            );
          });

          contents = _react2.default.createElement(
            _List2.default,
            { onMore: onMore },
            _items
          );
        }

        return _react2.default.createElement(
          _Box2.default,
          { size: this.props.width, alignSelf: 'center', justify: 'center' },
          contents
        );
      }
    }]);

    return GTable;
  }(_react.Component);

  var headerType = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]);

  GTable.propTypes = {
    headers: _propTypes2.default.arrayOf(headerType).isRequired,
    data: _propTypes2.default.arrayOf(_propTypes2.default.object).isRequired,
    pageSize: _propTypes2.default.number,
    container: _propTypes2.default.oneOf(['table', 'list']),
    width: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object])
  };

  GTable.defaultProps = {
    pageSize: 15,
    container: 'table',
    width: 'medium'
  };

  var select = function select(store) {
    return { filter: store.filter };
  };

  exports.default = (0, _reactRedux.connect)(select)(GTable);
});