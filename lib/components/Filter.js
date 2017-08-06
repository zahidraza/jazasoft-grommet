(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-redux', '../actions/filterActions', 'grommet/components/Button', 'grommet/components/icons/base/Close', 'grommet/components/Header', 'grommet/components/Heading', 'grommet/components/Layer', 'grommet/components/Section', 'grommet/components/Select', 'grommet/components/Sidebar', 'grommet-addons/components/Sort', 'grommet/components/icons/base/ClearOption'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-redux'), require('../actions/filterActions'), require('grommet/components/Button'), require('grommet/components/icons/base/Close'), require('grommet/components/Header'), require('grommet/components/Heading'), require('grommet/components/Layer'), require('grommet/components/Section'), require('grommet/components/Select'), require('grommet/components/Sidebar'), require('grommet-addons/components/Sort'), require('grommet/components/icons/base/ClearOption'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactRedux, global.filterActions, global.Button, global.Close, global.Header, global.Heading, global.Layer, global.Section, global.Select, global.Sidebar, global.Sort, global.ClearOption);
    global.Filter = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactRedux, _filterActions, _Button, _Close, _Header, _Heading, _Layer, _Section, _Select, _Sidebar, _Sort, _ClearOption) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _Button2 = _interopRequireDefault(_Button);

  var _Close2 = _interopRequireDefault(_Close);

  var _Header2 = _interopRequireDefault(_Header);

  var _Heading2 = _interopRequireDefault(_Heading);

  var _Layer2 = _interopRequireDefault(_Layer);

  var _Section2 = _interopRequireDefault(_Section);

  var _Select2 = _interopRequireDefault(_Select);

  var _Sidebar2 = _interopRequireDefault(_Sidebar);

  var _Sort2 = _interopRequireDefault(_Sort);

  var _ClearOption2 = _interopRequireDefault(_ClearOption);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

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

  var Filter = function (_Component) {
    _inherits(Filter, _Component);

    function Filter() {
      _classCallCheck(this, Filter);

      var _this = _possibleConstructorReturn(this, (Filter.__proto__ || Object.getPrototypeOf(Filter)).call(this));

      _this._onClose = _this._onClose.bind(_this);
      _this._onChange = _this._onChange.bind(_this);
      _this._onClear = _this._onClear.bind(_this);
      return _this;
    }

    _createClass(Filter, [{
      key: '_onClose',
      value: function _onClose() {
        if (this.props.onClose) {
          this.props.onClose();
        }
      }
    }, {
      key: '_onClear',
      value: function _onClear() {
        this.props.dispatch({ type: _filterActions.CLEAR_FILTER });
      }
    }, {
      key: '_onChange',
      value: function _onChange(name, event) {
        var filter = this.props.filter.filter;
        if (!event.option.value || event.option.value == 'All') {
          // user selected the 'All' option, which has no value, clear filter
          delete filter[name];
        } else {
          // we get the new option passed back as an object,
          // normalize it to just a value
          var selectedFilter = event.value.map(function (value) {
            return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' ? value.value : value;
          });
          selectedFilter = selectedFilter.filter(function (v) {
            return v != 'All';
          });
          filter[name] = selectedFilter;
          if (filter[name].length === 0) {
            delete filter[name];
          }
        }
        this.props.dispatch({ type: _filterActions.APPLY_FILTER, payload: { filter: filter } });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var _props = this.props,
            active = _props.active,
            filterItems = _props.filterItems,
            filter = _props.filter.filter;

        var onClose = void 0;

        var items = filterItems.map(function (item, idx) {
          var elements = item.elements;
          elements = elements.map(function (e) {
            if (typeof e === 'string' || e instanceof String) {
              return { label: e, value: e };
            }
            if (e instanceof Object) {
              return e;
            }
          });
          if (item.inline != undefined && !item.inline) {
            elements.unshift({ label: 'All', value: 'All' });
          } else {
            elements.unshift({ label: 'All', value: undefined });
          }
          var value = filter[item.label];
          if (value == undefined && item.inline != undefined && !item.inline) {
            value = 'All';
          }

          return _react2.default.createElement(
            _Section2.default,
            { key: idx, pad: { horizontal: 'large', vertical: 'small' } },
            _react2.default.createElement(
              _Heading2.default,
              { tag: 'h3' },
              item.label
            ),
            _react2.default.createElement(_Select2.default, {
              inline: item.inline != undefined ? item.inline : true,
              multiple: true,
              options: elements,
              value: value,
              onChange: _this2._onChange.bind(_this2, item.label) })
          );
        });

        return _react2.default.createElement(
          _Layer2.default,
          { hidden: !active, align: 'right', flush: true, closer: true, onClose: this._onClose },
          _react2.default.createElement(
            _Sidebar2.default,
            { size: 'large' },
            _react2.default.createElement(
              _Header2.default,
              { size: 'large', justify: 'between', align: 'center',
                pad: { horizontal: 'medium' },
                margin: { vertical: 'medium' }
              },
              _react2.default.createElement(
                _Heading2.default,
                { tag: 'h2' },
                'Filter'
              ),
              _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_ClearOption2.default, null), label: 'Clear All', plain: true,
                onClick: this._onClear })
            ),
            items
          )
        );
      }
    }]);

    return Filter;
  }(_react.Component);

  Filter.propTypes = {
    active: _propTypes2.default.bool.isRequired,
    filterItems: _propTypes2.default.array
  };

  Filter.defaultProps = {
    filterItems: []
  };

  var select = function select(store) {
    return { filter: store.filter };
  };

  exports.default = (0, _reactRedux.connect)(select)(Filter);
});