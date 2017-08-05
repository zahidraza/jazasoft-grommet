(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'react', 'prop-types', 'react-router', 'grommet/components/Sidebar', 'grommet/components/Header', 'grommet/components/Title', 'grommet/components/Button', 'grommet/components/Menu', 'grommet/components/icons/base/Close', './MenuItemLink'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('react'), require('prop-types'), require('react-router'), require('grommet/components/Sidebar'), require('grommet/components/Header'), require('grommet/components/Title'), require('grommet/components/Button'), require('grommet/components/Menu'), require('grommet/components/icons/base/Close'), require('./MenuItemLink'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.react, global.propTypes, global.reactRouter, global.Sidebar, global.Header, global.Title, global.Button, global.Menu, global.Close, global.MenuItemLink);
    global.GSidebar = mod.exports;
  }
})(this, function (exports, _react, _propTypes, _reactRouter, _Sidebar, _Header, _Title, _Button, _Menu, _Close, _MenuItemLink) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _react2 = _interopRequireDefault(_react);

  var _propTypes2 = _interopRequireDefault(_propTypes);

  var _Sidebar2 = _interopRequireDefault(_Sidebar);

  var _Header2 = _interopRequireDefault(_Header);

  var _Title2 = _interopRequireDefault(_Title);

  var _Button2 = _interopRequireDefault(_Button);

  var _Menu2 = _interopRequireDefault(_Menu);

  var _Close2 = _interopRequireDefault(_Close);

  var _MenuItemLink2 = _interopRequireDefault(_MenuItemLink);

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

  var GSidebar = function (_Component) {
    _inherits(GSidebar, _Component);

    function GSidebar() {
      _classCallCheck(this, GSidebar);

      return _possibleConstructorReturn(this, (GSidebar.__proto__ || Object.getPrototypeOf(GSidebar)).call(this));
    }

    _createClass(GSidebar, [{
      key: 'render',
      value: function render() {
        var _props = this.props,
            links = _props.links,
            location = _props.location,
            fixed = _props.fixed;


        var items = links.map(function (link, index) {
          var value = '/' + link.path == location.pathname ? 'active' : '';
          return _react2.default.createElement(_MenuItemLink2.default, { className: value, key: link.label, to: '/' + link.path, label: link.label });
        });

        return _react2.default.createElement(
          _Sidebar2.default,
          { colorIndex: 'neutral-1', size: 'small', fixed: fixed },
          _react2.default.createElement(
            _Header2.default,
            { pad: 'medium', justify: 'between' },
            _react2.default.createElement(
              _Title2.default,
              null,
              this.props.appShortName
            )
          ),
          _react2.default.createElement(
            _Menu2.default,
            { fill: true, primary: true },
            items
          )
        );
      }
    }]);

    return GSidebar;
  }(_react.Component);

  GSidebar.propTypes = {
    links: _propTypes2.default.array.isRequired,
    appShortName: _propTypes2.default.string.isRequired,
    fixed: _propTypes2.default.bool
  };

  GSidebar.defaultProps = {
    fixed: false
  };

  exports.default = (0, _reactRouter.withRouter)(GSidebar);
});