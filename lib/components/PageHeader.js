(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-router-dom', 'grommet/components/icons/base/Add', 'grommet/components/Box', 'grommet/components/Button', 'grommet-addons/components/FilterControl', 'grommet/components/Header', 'grommet/components/icons/base/Help', 'grommet/components/Title', 'grommet/components/Search'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-router-dom'), require('grommet/components/icons/base/Add'), require('grommet/components/Box'), require('grommet/components/Button'), require('grommet-addons/components/FilterControl'), require('grommet/components/Header'), require('grommet/components/icons/base/Help'), require('grommet/components/Title'), require('grommet/components/Search'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactRouterDom, global.Add, global.Box, global.Button, global.FilterControl, global.Header, global.Help, global.Title, global.Search);
    global.PageHeader = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactRouterDom, _Add, _Box, _Button, _FilterControl, _Header, _Help, _Title, _Search) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _Add2 = _interopRequireDefault(_Add);

  var _Box2 = _interopRequireDefault(_Box);

  var _Button2 = _interopRequireDefault(_Button);

  var _FilterControl2 = _interopRequireDefault(_FilterControl);

  var _Header2 = _interopRequireDefault(_Header);

  var _Help2 = _interopRequireDefault(_Help);

  var _Title2 = _interopRequireDefault(_Title);

  var _Search2 = _interopRequireDefault(_Search);

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

  var PageHeader = function (_Component) {
    _inherits(PageHeader, _Component);

    function PageHeader() {
      _classCallCheck(this, PageHeader);

      var _this = _possibleConstructorReturn(this, (PageHeader.__proto__ || Object.getPrototypeOf(PageHeader)).call(this));

      _this._onSearch = _this._onSearch.bind(_this);
      _this._onAdd = _this._onAdd.bind(_this);
      _this._onFilter = _this._onFilter.bind(_this);
      _this._onHelp = _this._onHelp.bind(_this);
      return _this;
    }

    _createClass(PageHeader, [{
      key: '_onSearch',
      value: function _onSearch() {
        if (this.props.onSearch) {
          this.props.onSearch();
        }
      }
    }, {
      key: '_onAdd',
      value: function _onAdd() {
        var _props = this.props,
            history = _props.history,
            match = _props.match,
            pathAdd = _props.pathAdd;

        history.push('' + match.path + pathAdd);
      }
    }, {
      key: '_onFilter',
      value: function _onFilter() {
        if (this.props.onFilter) {
          this.props.onFilter();
        }
      }
    }, {
      key: '_onHelp',
      value: function _onHelp() {
        if (this.props.onHelp) {
          this.props.onHelp();
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _props2 = this.props,
            title = _props2.title,
            justify = _props2.justify,
            searchControl = _props2.searchControl,
            searchPlaceholder = _props2.searchPlaceholder,
            searchValue = _props2.searchValue,
            addControl = _props2.addControl,
            pathAdd = _props2.pathAdd,
            filterControl = _props2.filterControl,
            filteredTotal = _props2.filteredTotal,
            unfilteredTotal = _props2.unfilteredTotal,
            helpControl = _props2.helpControl,
            match = _props2.match;


        console.log(this.props);

        var searchItem = void 0,
            addItem = void 0,
            filterItem = void 0,
            helpItem = void 0;
        if (searchControl) {
          searchItem = _react2.default.createElement(_Search2.default, { inline: true, fill: true, size: 'medium', placeHolder: searchPlaceholder,
            value: searchValue, onDOMChange: this._onSearch });
        }
        if (addControl) {
          addItem = _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Add2.default, null), onClick: this._onAdd });
        }

        if (filterControl) {
          filterItem = _react2.default.createElement(_FilterControl2.default, { filteredTotal: filteredTotal,
            unfilteredTotal: unfilteredTotal,
            onClick: this._onFilter });
        }

        if (helpControl) {
          helpItem = _react2.default.createElement(_Button2.default, { icon: _react2.default.createElement(_Help2.default, null), onClick: this._onHelp });
        }

        return _react2.default.createElement(
          _Header2.default,
          { id: 'page-header', justify: justify, fixed: true, size: 'large', pad: { horizontal: 'medium' } },
          _react2.default.createElement(
            _Title2.default,
            { responsive: false },
            ' ',
            _react2.default.createElement(
              'span',
              null,
              title
            ),
            ' '
          ),
          searchItem,
          _react2.default.createElement(
            _Box2.default,
            { direction: 'row' },
            addItem,
            filterItem,
            helpItem
          )
        );
      }
    }]);

    return PageHeader;
  }(_react.Component);

  PageHeader.propTypes = {
    title: _propTypes2.default.string.isRequired,
    justify: _propTypes2.default.string,
    searchControl: _propTypes2.default.bool,
    searchValue: _propTypes2.default.string,
    searchPlaceholder: _propTypes2.default.string,
    onSearch: _propTypes2.default.func,
    addControl: _propTypes2.default.bool,
    pathAdd: _propTypes2.default.string,
    filterControl: _propTypes2.default.bool,
    onFilter: _propTypes2.default.func,
    filteredTotal: _propTypes2.default.number,
    unfilteredTotal: _propTypes2.default.number,
    helpControl: _propTypes2.default.bool,
    onHelp: _propTypes2.default.func
  };

  PageHeader.defaultProps = {
    justify: 'between',
    searchControl: false,
    searchValue: '',
    searchPlaceholder: 'Search',
    addControl: false,
    pathAdd: 'add',
    filterControl: false,
    filteredTotal: 0,
    unfilteredTotal: 0,
    helpControl: false
  };

  exports.default = (0, _reactRouterDom.withRouter)(PageHeader);
});